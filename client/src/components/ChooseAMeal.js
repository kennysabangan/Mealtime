import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseAMeal = (props) => {
  const { tags } = props;
  const [meals, setMeals] = useState([]);
  const [index, setIndex] = useState(0);
  const [meal, setMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const joinedTags = tags.join(", ");
  const navigate = useNavigate();

  useEffect(() => {
    const getMeals = async () => {
      try {
        // Random query if tags ARE given
        if (tags.length != 0) {
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
          // Random query if tages ARE NOT given
          var options = {
            method: "GET",
            url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
            params: { number: "2" },
            headers: {
              "X-RapidAPI-Host":
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "X-RapidAPI-Key":
                "0f84236229msh09b7a39c03b9eafp13e306jsnb8eba2675d6a",
            },
          };
        }

        const res = await axios.request(options);
        console.log(res.data);
        const apiData = res.data;

        // Makes a Bing Image Search for every recipe since original Recipe API's photos were very poor quality
        res.data.recipes.forEach((recipe) => {
          var options = {
            method: "GET",
            url: "https://bing-image-search1.p.rapidapi.com/images/search",
            params: { q: `${recipe.title} recipe`, count: "3", offset: "1" },
            headers: {
              "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
              "X-RapidAPI-Key":
                "0f84236229msh09b7a39c03b9eafp13e306jsnb8eba2675d6a",
            },
          };
          axios
            .request(options)
            .then(function (response) {
              response.data.value[0].thumbnailUrl
                ? (recipe.image = response.data.value[0].thumbnailUrl)
                : (recipe.image = recipe.image);
            })
            .catch(function (error) {
              console.error(error);
            });
        });

        setMeals(apiData);
        setMeal(res.data.recipes[0]);
        setLoaded(true);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMeals();
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

  const handleAddRecipe = () => {
    axios
      .post(
        "http://localhost:8000/api/recipe",
        {
          recipes: meal,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return meals.recipes && meals.recipes.length != 0 ? (
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
              meals.recipes && index == 0 ? "disabled" : null
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
              <img
                src={meals.recipes && meals.recipes[index].image}
                height="420"
              />
            </div>
            <div className="card-body text-center">
              <h2>{meals.recipes && meals.recipes[index].title}</h2>
              <p className="card-text">
                Total Servings: {meals.recipes && meals.recipes[index].servings}
              </p>
              <p className="card-text">
                Ready in: {meals.recipes && meals.recipes[index].readyInMinutes}{" "}
                minutes
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
              meals.recipes && index == meals.recipes.length - 1
                ? "disabled"
                : null
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
      <div className="text-center mt-5 pt-5">
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
