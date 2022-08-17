import React, { useState, UseEffect, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";

const OneMeal = () => {
  const { id } = useParams(); // id will be specific recipe id.
  const [meal, setMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMeal = async () => {

      await axios.get(`${process.env.REACT_APP_SERVER}/api/recipe/${id}`)
        .then(res => {
          setMeal(res.data)
          setLoaded(true);
          console.log(res.data);
        })
    };
    getMeal();
    console.log("devlog", meal);
  }, []);

  const handleDeleteRecipe = () => {
    axios.delete(`${process.env.REACT_APP_SERVER}/api/users/recipes/${id}`, { withCredentials: true })
      .then(() => navigate('/dashboard'))
      .catch(err => console.log(err));
  }

  return ( loaded &&
    <MDBContainer style={{ marginTop: "30px" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" className="col-example">
          <h1 className="recipe-header">{meal && meal.recipeName}</h1>
        </MDBCol>
        <MDBCol md="3" className="col-example">
          {/* <button className="btn btn-dark">Delete From Recipes</button> */}
        </MDBCol>
      </MDBRow>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" className="col-example justify-content-center d-flex">
          <img
            style={{ maxHeight: "50vh"}}
            src={meal && meal.image}
            alt="Food Picture"
          />
        </MDBCol>
        <MDBCol md="3" className="col-example">

          <div className="recipe-times h-100 d-flex flex-column justify-content-around align-items-center">
            <h2
              className="recipe-header"
              style={{ textDecoration: "underline" }}
            >
              Meal Overview:
            </h2>
            <p>Prep Time: {meal && meal.prepTime} Minutes</p>
            <p>Total Time: {meal && Math.ceil(meal.prepTime * 1.55)} Minutes</p>
            <p>Servings: {meal && meal.servings}</p>
            <button className="btn btn-danger" onClick={handleDeleteRecipe}>
              <i className="fas fa-times me-2"></i>
              Delete From Recipes
            </button>
          </div>
        </MDBCol>
      </MDBRow>
      <hr />
      { meal.ingredients.length != 0 &&
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="9" className="col-example">
        <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
          Ingredients:
        </h2>
        {meal &&
          meal.ingredients.map((ingredient, index) => {
            return (
              <ul key={index} style={{ marginLeft: "20px" }}>
                <li> {ingredient.original}</li>
              </ul>
            );
          })}
          </MDBCol>
      </MDBRow>
      }

      { meal && meal.instructions[0].instructions &&
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="9" className="col-example mb-5">
          <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
            Instructions:
          </h2>
          <ol style={{ marginLeft: "20px" }}>
            {meal &&
              meal.instructions[0].instructions.map((step, index) => {
                return (
                    <li key={index} className="instructions">
                      {step.step}
                    </li>
                );
              })}
            </ol>
          </MDBCol>
      </MDBRow>
      }
      { meal && meal.instructions[0].steps &&
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="9" className="col-example mb-5">
          <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
            Instructions:
          </h2>
          <ol style={{ marginLeft: "20px" }}>
            {meal &&
              meal.instructions[0].steps.map((step, index) => {
                return (
                    <li key={index} className="instructions">
                      {step.step}
                    </li>
                );
              })}
            </ol>
          </MDBCol>
      </MDBRow>
      }
    </MDBContainer>
  );
};

export default OneMeal;
