import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseAMeal = (props) => {
  const { tags, query } = props;
  const [meals, setMeals] = useState();
  const [index, setIndex] = useState(0);
  const [meal, setMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const joinedTags = tags.join(", ");
  const navigate = useNavigate();

  const getMeals = async () => {
    try {
      // If a Search Query IS Given
      if (query) {
        // OUR TAGS: dairy free, vegan, grain free, keto, whole30
        // diets possible: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
        // intolerances possible: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.

        // >>> HOW WE'LL USE OUR TAGS <<<
        // dairy free: { intolerance: dairy }
        // vegan: { diet: vegan }
        // grain free: { intolerance: gluten, wheat }
        // keto: { } - can't account for keto, maybe let's try { intolerance: wheat}
        // whole30: { diet: ovo vegetarian, intolerance: dairy, gluten }

        let dietQuery = [],
          intolerancesQuery = [];
        tags.map((tag) => {
          switch (tag) {
            case "dairy free":
              if (dietQuery.length == 0) {
                intolerancesQuery.push("dairy");
              }
              break;
            case "vegan":
              if (dietQuery.length == 0) {
                dietQuery.push("vegan");
              }
              break;
            case "grain free":
              if (!intolerancesQuery.includes("gluten")) {
                intolerancesQuery.push("gluten");
              }
              if (!intolerancesQuery.includes("wheat")) {
                intolerancesQuery.push("wheat");
              }
              break;
            case "keto":
              if (!intolerancesQuery.includes("wheat")) {
                intolerancesQuery.push("wheat");
              }
              break;
            case "whole30":
              if (dietQuery.length == 0) {
                dietQuery.push("ovo vegetarian");
              }
              if (!intolerancesQuery.includes("dairy")) {
                intolerancesQuery.push("dairy");
              }
              if (!intolerancesQuery.includes("gluten")) {
                intolerancesQuery.push("gluten");
              }
              break;
          }
        });
        const dietString = dietQuery.length != 0 ? dietQuery.join(",") : " ";
        const intolerancesString =
          intolerancesQuery.length != 0 ? intolerancesQuery.join(",") : " ";
        // console.log(dietString, intolerancesString)

        var options = {
          method: "GET",
          url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
          params: {
            query: `${query}`,
            diet: `${dietString}`,
            intolerances: `${intolerancesString}`,
            instructionsRequired: "true",
            number: "1",
            offset: "0",
          },
          headers: {
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd",
          },
        };
        // console.log("options: ", options);
      } else if (tags.length != 0) {
        // No Query => Run "Random" query if tags ARE given
        var options = {
          method: "GET",
          url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
          params: { tags: { joinedTags }, number: "2" },
          headers: {
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd",
          },
        };
      } else {
        // No Query => Run "Random" query BUT IF tags ARE NOT given
        var options = {
          method: "GET",
          url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
          params: { number: "2" },
          headers: {
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd",
          },
        };
      }

      let res = await axios.request(options);

      // Makes a Bing Image Search for every recipe since original Recipe API's photos were very poor quality
      const pointer = res.data.expires ? res.data.results : res.data.recipes;
      const replaceImages = async () => {
        pointer.forEach(async (recipe) => {
          if (query) {
            recipe.image = res.data.baseUri + recipe.image;
          }
          var options = {
            method: "GET",
            url: "https://bing-image-search1.p.rapidapi.com/images/search",
            params: { q: `${recipe.title} recipe`, count: "3", offset: "1" },
            headers: {
              "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
              "X-RapidAPI-Key":
                "9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd",
            },
          };

          await axios
            .request(options)
            .then(function (response) {
              response.data.value[0].thumbnailUrl
                ? (recipe.image = response.data.value[0].thumbnailUrl)
                : recipe.image;
            })
            .catch(function (error) {
              console.error(error);
            });
        });

        // Search Query returns 'Results' but our original codebase calls for apiData['recipes']
        if (res.data.results) {
          res.data.recipes = res.data.results;
          delete res.data.results;
        }
        return await res.data;
      };
      const apiData = await replaceImages();
      return apiData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    var loadedApiData = await getMeals();
    await setMeal(loadedApiData.recipes[0]);
    await setMeals(loadedApiData);
    await setLoaded(true);
  }, []);

  const handleNext = () => {
    let tempIndex = index;
    if (tempIndex < meals.recipes.length - 1) {
      tempIndex = tempIndex + 1;
      let tempMeal = {};
      tempMeal = meals.recipes[tempIndex];
      setMeal(tempMeal);
      setIndex(tempIndex);
    }
  };

  const handlePrevious = () => {
    let tempIndex = index;
    if (tempIndex > 0) {
      tempIndex = tempIndex - 1;
      let tempMeal = {};
      tempMeal = meals.recipes[tempIndex];
      setMeal(tempMeal);
      setIndex(tempIndex);
    }
  };

  const handleAddRecipe = async () => {
    console.log(meal);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/recipe",
        {
          recipeName: meal.title,
          prepTime: meal.readyInMinutes,
          servings: meal.servings,
          image: meal.image,
          ingredients: meal.extendedIngredients,
          instructions: meal.analyzedInstructions[0],
          // ingredients: console.log(res.data.recipes[0].extendedIngredients[0].original);
          // image console.log(res.data.recipes[0].image);
          // servings console.log(res.data.recipes[0].servings);
          // preptime console.log(res.data.recipes[0].readyInMinutes);
          // title console.log(res.data.recipes[0].title);
          // instructions console.log(res.data.recipes[0].analyzedInstructions[0].steps);
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    // .then((res) => {
    //   console.log(res.data);
    //   navigate("/dashboard");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return loaded && meal ? (
    <div className="container">
      <div className="row text-center d-flex justify-content-center align-items-center">
        <h1 className="tasty cursive mt-5 rounded" style={{ width: 415 }}>
          Look Tasty?
        </h1>
      </div>
      <div className="row">
        <div
          onClick={handlePrevious}
          className="col-md-4 d-flex align-items-center d-flex justify-content-start"
        >
          <button
            className={`meal-btn d-flex gap-3 align-items-center justify-content-center pt-3 ${
              meals && index == 0 ? "disabled" : null
            }`}
          >
            <i className="fas fa-angle-left mb-2 pb-1 "></i>
            <h1 className="cursive">Previous</h1>
          </button>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="bg-image d-flex justify-content-center">
              {/* <img src="https://media.olivegarden.com/en_us/images/product/classic-chicken-alfredo-dinner-dpv-590x365.jpg" className="img-fluid"/> */}
              <img src={meals && meal.image} height="420" />
            </div>
            <div className="card-body text-center">
              <h2>{meals && meal.title}</h2>
              <p className="card-text">
                Total Servings: {meals && meal.servings}
              </p>
              <p className="card-text">
                Ready in: {meals && meal.readyInMinutes} minutes
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-md-4 d-flex align-items-center justify-content-end"
          onClick={handleNext}
        >
          <button
            className={`meal-btn d-flex gap-3 align-items-center justify-content-center pt-3 ${
              meals && index == meals.recipes.length - 1 ? "disabled" : null
            }`}
          >
            <h1 className="cursive">Next</h1>
            <i className="fas fa-angle-right mb-2 pb-1"></i>
          </button>
        </div>
      </div>
      <div className="m-4 text-center">
        <button
          onClick={handleAddRecipe}
          className="btn btn-lg"
          style={{
            marginTop: "2px",
            backgroundColor: "#48BD8F",
            fontWeight: "bold",
          }}
        >
          <span>Add to My Recipes</span>
        </button>
      </div>
    </div>
  ) : (
    loaded && (
      // If No Search Query Found, Return 404 Message
      <div className="text-center" style={{ paddingTop: "350px" }}>
        <h1 className="cursive">
          We were not able to find a recipe with your search.
        </h1>
        <a className="btn btn-dark" href="/dashboard">
          <i className="fas fa-angle-left me-3"></i>
          Go Back
        </a>
      </div>
    )
  );
};

export default ChooseAMeal;
