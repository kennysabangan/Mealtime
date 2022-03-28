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
        console.log(res);
        console.log(res.data);
        setMeals(res.data);
        setMeal(res.data.recipes[0]);
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
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h2>Look Tasty?</h2>
          <p>{meals.recipes && meals.recipes[index].title}</p>
        </div>
      </div>
      <div className="row" style={{ fontSize: "2rem" }}>
        <div className="col-md-4 d-flex align-items-center d-flex justify-content-start">
          <i className="fas fa-angle-left fa-fw d-flex align-items-center"></i>
          <p onClick={handlePrevious}>Previous</p>
        </div>
        <div className="col-md-4">
          <img
            src={meals.recipes && meals.recipes[index].image}
            //src="https://media.olivegarden.com/en_us/images/product/classic-chicken-alfredo-dinner-dpv-590x365.jpg"
            className="img-fluid"
            alt="Wild Landscape"
          />
        </div>
        <div className="col-md-4 d-flex align-items-center d-flex justify-content-end">
          <p onClick={handleNext}>Next</p>
          <i className="fas fa-angle-right fa-fw d-flex align-items-center d-flex justify-content-end"></i>
        </div>
      </div>
      <div className="m-4 d-flex justify-content-center">
        <a
          className="btn"
          style={{ marginTop: "2px", backgroundColor: "#48BD8F" }}
        >
          Add to Meal Plan
        </a>
      </div>
    </div>
  );
};

export default ChooseAMeal;
