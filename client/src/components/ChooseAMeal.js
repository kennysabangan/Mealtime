import React, { useState, useEffect } from "react";
import axios from "axios";

const ChooseAMeal = (props) => {
  const { tags } = props;
  const [meals, setMeals] = useState([]);
  const [index, setIndex] = useState(0);
  const [meal, setMeal] = useState({});

  useEffect(() => {
    const getMeals = async () => {
      try {
        var options = {
          method: "GET",
          url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
          params: { tags: { tags }, number: "3" },
          headers: {
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd",
          },
        };
        const res = await axios.request(options);
        const apiData = res.data;

        // Makes a Bing Image Search for every recipe since other API's photos were very poor quality
        res.data.recipes.forEach(recipe => {
          var options = {
            method: 'GET',
            url: 'https://bing-image-search1.p.rapidapi.com/images/search',
            params: {q: `${recipe.title} recipe`, count: '3', offset: '1'},
            headers: {
              'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com',
              'X-RapidAPI-Key': '9fc53f2c2fmsh8633a9448fc45adp1d4bd0jsn4d61359145cd'
            }
          };
          axios.request(options).then(function (response) {
            recipe.image = response.data.value[0].thumbnailUrl;
          }).catch(function (error) {
            console.error(error);
          });
        })

        setMeals(apiData);
        setMeal(res.data.recipes[0]);
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

  return (
    <div className="container mt-3">
      <div className="row text-center">
          <h1 className="cursive mt-5">Look Tasty?</h1>
      </div>
      <div className="row" >
        <div onClick={handlePrevious} className="col-md-4 d-flex align-items-center d-flex justify-content-start">
        <button className={`meal-btn d-flex gap-3 align-items-center justify-content-center h-100 ${meals.recipes && index == 0 ? 'disabled' : null}`}>
            <i className="fas fa-angle-left mb-2 pb-1"></i>
            <h1 className="cursive">Previous</h1>
          </button>
        </div>
        <div className="col-md-4">


          <div className="card">
            <div className="bg-image d-flex justify-content-center">
              {/* <img src="https://media.olivegarden.com/en_us/images/product/classic-chicken-alfredo-dinner-dpv-590x365.jpg" className="img-fluid"/> */}
              <img src={meals.recipes && meals.recipes[index].image} height="420" />
            </div>
            <div className="card-body text-center">
              <h2>{meals.recipes && meals.recipes[index].title}</h2>
              <p className="card-text">Total Servings: {meals.recipes && meals.recipes[index].servings}</p>
              <p className="card-text">Ready in: {meals.recipes && meals.recipes[index].readyInMinutes} minutes</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end" onClick={handleNext}>
          <button className={`meal-btn d-flex gap-3 align-items-center justify-content-center h-100 ${meals.recipes && index == meals.recipes.length - 1 ? 'disabled' : null}`}>
            <h1 className="cursive">Next</h1>
            <i className="fas fa-angle-right mb-2 pb-1"></i>
          </button>
        </div>
      </div>
      <div className="m-4 text-center">
        <button
          className="btn btn-lg"
          style={{ marginTop: "2px", backgroundColor: "#48BD8F" }}
        >
          Add to Meal Plan
        </button>
      </div>
    </div>
  );
};

export default ChooseAMeal;
