import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBContainer,
} from "mdb-react-ui-kit";

const RecipeGrid = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/users/recipes`, {
        withCredentials: true,
      });
      setRecipes(res.data);
      setLoaded(true);
    };
    getRecipes();
  }, []);


  return (
    <MDBContainer className="d-flex flex-wrap gap-2">
      {loaded && recipes.map((item, idx) => (
        <MDBCard key={idx} className="m-2" style={{ width: "30%" }}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay text-center"
          >
            <a href={`/onerecipe/${item.recipe._id}`}>
              <MDBCardImage src={item.recipe.image} height="225" />
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{item.recipe.recipeName}</MDBCardTitle>
            <MDBCardText>
              <span>
                Servings: {item.recipe.servings}{" "}
                <i className="fas fa-utensils mx-2"></i> Time to Cook:{" "}
                {item.recipe.prepTime} minutes{" "}
              </span>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBContainer>
  );
};

export default RecipeGrid;
