import React, { useState, UseEffect } from "react";
import axios from "axios";

const OneMeal = (props) => {
  return (
    <div className="container mt-5">
      <h3>Chicken Alfredo</h3>
      <div className="row ">
        <div className="col-md-2 d-flex align-self-start d-flex justify-content-start">
          <img
            style={{ width: "100%" }}
            src="https://media.olivegarden.com/en_us/images/product/classic-chicken-alfredo-dinner-dpv-590x365.jpg"
            alt="Food Picture"
          />
        </div>
        <div className="ms-2 col-md-1 d-flex align-self-start d-flex justify-content-start">
          <p>Reciipe Details:</p>
          <p>Ingredients</p>

          <ul>
            <li>Chicken</li>
            <li>Alfredo</li>
            <li>Noodles</li>
          </ul>
        </div>
      </div>
      <div className="mt-5 container">
        <p>Recipe Details</p>
      </div>
    </div>
  );
};

export default OneMeal;
