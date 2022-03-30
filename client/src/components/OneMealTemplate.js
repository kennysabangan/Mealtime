import React, { useState, UseEffect, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

const OneMealTemplate = (props) => {
  const { id } = useParams(); // id will be specific recipe id.
  console.log(id);

  useEffect(() => {
    const getMeal = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/recipe/624340f380719d1e0ecad17b"
      );
    };
    getMeal();
  }, []);

  return (
    <MDBContainer style={{ marginTop: "30px" }}>
      <MDBRow>
        <h1 className="recipe-header">Piri Piri Fried Chicken</h1>
        <MDBCol md="8" className="col-example">
          <img
            style={{ width: "100%" }}
            src="https://www.simplyrecipes.com/thmb/5JovaaUX0bcawTsK2nk-0FTuWzw=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Piri-Piri-Fried-Chicken-LEAD-02-641ceae81d724eeab1e29453a42c76a7.jpg"
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
            <p>Prep Time: [insert recipe prep time]</p>
            <p>Cook Time: [insert recipe cook time]</p>
            <p>Total Time: [insert recipe total time]</p>
            <p>Servings: [insert amount of servings]</p>
          </div>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow>
        <p className="recipe-desc" style={{ fontStyle: "italic" }}>
          This crispy South African inspired fried chicken recipe is made with a
          dry seasoning blend of bird’s eye chili peppers, paprika, salt, lemon
          peels, oregano, and garlic — it’s finger licking good!
        </p>
      </MDBRow>
      <hr />
      <MDBRow>
        <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
          Ingredients:
        </h2>
        <p>For the chicken:</p>
        <ul style={{ marginLeft: "20px" }}>
          <li>2 1/2 cups buttermilk</li>
          <li>2 tablespoons kosher salt</li>
          <li>1 tablespoon Piri Piri spice blend</li>
          <li>1 tablespoon onion powder</li>
          <li>1 tablespoon garlic powder</li>
          <li>
            3 1/2 pounds bone in and skin on chicken pieces (legs, thigh, and
            wings)
          </li>
        </ul>
        <p>For the flour coating:</p>
        <ul style={{ marginLeft: "20px" }}>
          <li>2 cups (272 grams) all-purpose flour</li>
          <li>2 tablespoons Piri Piri spice blend</li>
          <li>1 1/2 teaspoon black pepper</li>
          <li>2 tablespoons smoked paprika</li>
          <li>1/2 tablespoon garlic powder</li>
          <li>1 tablespoon onion powder</li>
          <li>1 teaspoon kosher salt</li>
          <li>For frying chicken</li>
          <li>Peanut oil or canola oil</li>
        </ul>
      </MDBRow>
      <hr />
      <MDBRow>
        <h2 className="recipe-header" style={{ textDecoration: "underline" }}>
          Instructions:
        </h2>
        <ol style={{ marginLeft: "20px" }}>
          <li className="instructions">
            Make the marinade: In a large bowl, combine the buttermilk, salt,
            piri piri spice blend, onion powder, and garlic powder. Add the
            chicken to this buttermilk mixture. Cover with plastic wrap and
            marinate the chicken in the refrigerator for 8 to 24 hours.
          </li>
          <li className="instructions">
            Make the flour coating for chicken: In a large plastic bag or in a
            large bowl combine the flour, piri piri spice blend, black pepper,
            paprika, garlic powder, onion powder, and salt.
          </li>
          <li className="instructions">
            Dredge the chicken pieces in flour mixture: Remove the chicken from
            the buttermilk marinade and allow the excess buttermilk to drip off.
            Individually dredge each piece into the flour mixture making sure
            the chicken is fully coated. Shake off the excess flour, place the
            chicken pieces on a sheet pan.
          </li>
          <li className="instructions">
            Let the floured chicken rest: Let the floured chicken pieces sit at
            room temperature for 30 minutes to help the flour adhere to the
            chicken and let the chicken come to room temperature.
          </li>
          <li className="instructions">
            Heat the frying oil: While the chicken sits for 30 minutes, fill the
            Dutch oven half way full with oil. Heat the oil, over medium-high
            heat until the oil reaches 325°F when using a kitchen thermometer.
            Alternatively, to tell if your oil is ready for frying you can add a
            pinch of flour into the oil, and when it begins to sizzle, your oil
            is ready.
          </li>
          <li className="instructions">
            Fry the chicken: Cook the chicken in batches by adding a few pieces
            of chicken to the pot and fry for about 15 minutes, turning halfway
            through the cooking time. Your chicken is full cooked through when
            the thickest part of the chicken pieces reaches 165°F when inserted
            with a digital thermometer.
          </li>
          <li className="instructions">
            Place chicken on a rack to drain excess oil: When the chicken is
            golden brown and cooked through, remove the chicken using tongs and
            place on a rack over a baking sheet to drain any excess oil.
          </li>
          <li className="instructions">
            Serve: Serve fried chicken warm along with your favorite sides
          </li>
        </ol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OneMealTemplate;
