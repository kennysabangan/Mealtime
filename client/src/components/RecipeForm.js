import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const RecipeForm = (props) => {


    useEffect(() => {
        document.querySelectorAll('.form-outline').forEach((formOutline) => {
            new mdb.Input(formOutline).init();
        });
    }, [])

    return (
        <MDBContainer style={{ marginTop: '30px' }}>
            <h1>Add your own Recipe</h1>
            <form>
                <div className="row justify-content-around">
                <div className="col-5">
                <div className="form-outline mb-2">
                    <input type="text" id="recipe-title" className="form-control" />
                    <label className="form-label" for="recipe-title">Recipe Title</label>
                </div>
                <div className="mb-2">
                    <input type="file" className="form-control" id="recipe-img" />
                    <label className="form-label" for="recipe-img">Recipe Image</label>
                </div>
                {/* Prep and Cooking times */}
                <div className="form-outline mb-2">
                    <input type="number" id="prep-time" className="form-control" />
                    <label className="form-label" for="prep-time">Prep Time (Minutes)</label>
                </div>
                <div className="form-outline mb-2">
                    <input type="number" id="cook-time" className="form-control" />
                    <label className="form-label" for="cook-time">Cook Time (Minutes)</label>
                </div>
                <div className="form-outline mb-2">
                    <input type="number" id="total-time" className="form-control" />
                    <label className="form-label" for="total-time">Total Time (Minutes)</label>
                </div>
                {/* Recipe Serving size */}
                <div className="form-outline mb-2">
                    <input type="number" id="servings" className="form-control" />
                    <label className="form-label" for="servings">Servings</label>
                </div>
                </div>

                <div className="col-5">
                    {/* Recipe details */}
                <div className="form-outline mb-2">
                    <textarea className="form-control" id="instructions" rows="4"></textarea>
                    <label className="form-label" for="recipe-desc">Recipe Description</label>
                </div>
                <div className="form-outline mb-2">
                    <textarea className="form-control" id="ingredients" rows="4"></textarea>
                    <label className="form-label" for="ingredients">Recipe Ingredients</label>
                </div>
                <div className="form-outline mb-2">
                    <textarea className="form-control" id="recipe-desc" rows="4"></textarea>
                    <label className="form-label" for="instructions">Recipe Instructions</label>
                </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary btn-block">Add Meal</button>
                </div>
                </div>
            </form>
        </MDBContainer>
    );
}

export default RecipeForm;