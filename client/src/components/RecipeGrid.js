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
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const RecipeGrid = () => {
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      const res = await axios.get("http://localhost:8000/api/users/recipes", {
        withCredentials: true,
      });
      setRecipes(res.data);
    };
    getRecipes();
    console.log(recipes);
  }, []);

  // const Display = (props) => {
  //     const {id} = props;
  //     const [petList, setPetList] = useState([]); -----but for recipe list   -------

  //     useEffect(() => {
  //         axios.get('http://localhost:8000/api/pets') ------ our API of choice --------
  //             .then(res=> {
  //                 console.log(res);
  //                 console.log(res.data);
  //                 setPetList(res.data);
  //             })
  //             .catch((err)=> {
  //                 console.log(err);
  //                 navigate("/error");
  //             })
  //     }, [id])

  {
    /* {
                petList? ------ but for recipeList -------

                petList.map((pet, index) => (
                    <tr key={index}>
                        <td style={{borderRight:"1px solid black"}}>{pet.petName}</td>
                        <td style={{borderRight:"1px solid black"}}>{pet.petType}</td>
                        <td style={{display:"flex"}}>
                            <Link to={`/pets/${pet._id}`} style={{borderRight:"1px solid black", paddingRight:"10px"}}>details</Link>
                            <Link to={`/pets/${pet._id}/edit`} style={{marginLeft:"5px"}}>edit</Link>
                        </td>
                    </tr>
                ))
                :null
            } */
  }

  return (
    <MDBContainer className="d-flex flex-wrap gap-2">
      {recipes.map((item, idx) => (
        <MDBCard key={idx} className="m-2" style={{ width: "30%" }}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay text-center"
          >
            <MDBCardImage src={item.recipe.image} height="225" />
            <a href="/onerecipe">
              <div
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
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
