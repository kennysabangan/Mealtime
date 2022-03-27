import React, { useState, UseEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const OneMeal = (props) => {
  const {id} = props; // id will be specific recipe id.

  return (
    <MDBContainer style={{ marginTop: '30px' }}>
      <MDBRow>
        <h1 className="recipe-header">Piri Piri Fried Chicken</h1>
        <MDBCol md='8' className='col-example'>
          <img
              // style={{ width: "100%" }}
              src="https://www.simplyrecipes.com/thmb/5JovaaUX0bcawTsK2nk-0FTuWzw=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Piri-Piri-Fried-Chicken-LEAD-02-641ceae81d724eeab1e29453a42c76a7.jpg"
              alt="Food Picture"
          />
        </MDBCol>
        <MDBCol md='4' className='col-example'>
          <div className="recipe-times h-100 d-flex flex-column justify-content-around align-items-start">
            <h2 className="recipe-header" style={{ textDecoration: 'underline' }}>Time Break Down:</h2>
            <p>Prep Time: [insert recipe prep time]</p>
            <p>Cook Time: [insert recipe cook time]</p>
            <p>Total Time: [insert recipe total time]</p>
            <p>Servings: [insert amount of servings]</p>
          </div>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow>
        <p className="h-100 d-flex  flex-row justify-content-center align-items-center" style={{ fontStyle: 'italic' }}>This crispy South African inspired fried chicken recipe is made with a dry seasoning blend of bird’s eye chili peppers, paprika, salt, lemon peels, oregano, and garlic — it’s finger licking good!</p>
      </MDBRow>
      <hr />
      <MDBRow>
        <MDBCol md='8' className='col-example'>
          <img
              // style={{ width: "100%" }}
              src="https://www.simplyrecipes.com/thmb/5JovaaUX0bcawTsK2nk-0FTuWzw=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Piri-Piri-Fried-Chicken-LEAD-02-641ceae81d724eeab1e29453a42c76a7.jpg"
              alt="Food Picture"
          />
        </MDBCol>
        <MDBCol md='4' className='col-example'>
          Prep Time: 
          Cook Time: 
          Total Time:
          Servings:
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OneMeal;
