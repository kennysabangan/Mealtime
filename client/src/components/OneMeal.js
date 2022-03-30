import React, { useState, UseEffect, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

const OneMeal = (props) => {
  const { id } = props; // id will be specific recipe id.
  const [meal, setmeal] = useState({});

  useEffect(() => {
    const getMeal = async () => {
      const res = await axios.get(`http://localhost:8000/api/recipe/${id}`);
      console.log(res);
      setmeal(res);
      console.log("devlog", meal);
    };
    getMeal();
  }, []);

  return (
    <MDBContainer style={{ marginTop: "30px" }}>
      <MDBRow>
        <h1 className="recipe-header">{meal.data && meal.data.recipeName}</h1>
        <MDBCol md="8" className="col-example">
          <img
            style={{ width: "100%" }}
            src={meal.data && meal.data.image}
            alt="Food Picture"
          />
        </MDBCol>
        <MDBCol md="4" className="col-example">
          <div className="recipe-times h-100 d-flex flex-column justify-content-around align-items-start">
            <h2
              className="recipe-header"
              style={{ textDecoration: "underline" }}
            >
              Time Break Down:
            </h2>
            <p>Prep Time: {meal.data && meal.data.prepTime}</p>
            <p>Cook Time: [insert recipe cook time]</p>
            <p>Total Time: [insert recipe total time]</p>
            <p>Servings: [insert amount of servings]</p>
          </div>
        </MDBCol>
      </MDBRow>
      <hr />
      {/* <MDBRow>
        <p className="recipe-desc" style={{ fontStyle: "italic" }}>
          This crispy South African inspired fried chicken recipe is made with a
          dry seasoning blend of bird’s eye chili peppers, paprika, salt, lemon
          peels, oregano, and garlic — it’s finger licking good!
        </p>
      </MDBRow> */}
      <hr />
      <MDBRow>
        <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
          Ingredients:
        </h2>
        {meal.data &&
          meal.data.ingredients.map((ingredient, index) => {
            return (
              <ul style={{ marginLeft: "20px" }}>
                <li key={ingredient.id}>{ingredient.original}</li>
              </ul>
            );
          })}
      </MDBRow>
      <hr />
      <MDBRow>
        <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
          Instructions:
        </h2>
        {meal.data &&
          meal.data.instructions[0].steps.map((step, index) => {
            return (
              <ol style={{ marginLeft: "20px" }}>
                <li key={index} className="instructions">
                  {step.step}
                </li>
              </ol>
            );
          })}
      </MDBRow>
    </MDBContainer>
  );
};

export default OneMeal;
