import React, { useState, UseEffect } from "react";
import axios from "axios";

const ChooseAMeal = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h2>Look Tasty?</h2>
          <p>Meatloaf</p>
        </div>
      </div>
      <div className="row" style={{ fontSize: "2rem" }}>
        <div className="col-md-4 d-flex align-items-center d-flex justify-content-start">
          <i className="fas fa-angle-left fa-fw d-flex align-items-center"></i>
          Previous
        </div>
        <div className="col-md-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/MeatloafWithSauce.jpg"
            className="img-fluid"
            alt="Wild Landscape"
          />
        </div>
        <div className="col-md-4 d-flex align-items-center d-flex justify-content-end">
          Next
          <i className="fas fa-angle-right fa-fw d-flex align-items-center d-flex justify-content-end"></i>
        </div>
      </div>
      <div className="m-4 d-flex justify-content-center">
        <a className="btn" style={{ marginTop: "2px", backgroundColor: "#48BD8F"}}>Add to Meal Plan</a>
      </div>
    </div>
  );
};

export default ChooseAMeal;
