import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RecipeGrid from "../components/RecipeGrid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [params, setParams] = useState({
    tags: [],
    number: 0,
    query: "",
    dairyFreeIsChecked: false,
    veganIsChecked: false,
    grainFreeIsChecked: false,
    ketoIsChecked: false,
    whole30IsChecked: false,
  });
  const [myRecipeBook, setMyRecipeBook] = useState([]);

  // Checkbox Functionality for Search
  const onChangeHandler = () => {
    const newStateObject = { ...params };
    const newTags = [];

    var inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach((input) => {
      const objectRestriction = input.id + "IsChecked";
      input.checked
        ? (newStateObject[objectRestriction] = true)
        : (newStateObject[objectRestriction] = false);
      input.checked && newTags.push(input.value);
    });

    newStateObject.tags = newTags;
    newStateObject.number = newTags.length;
    setParams(newStateObject); // Sets New State Object
  };

  // Search Button Pass Props to GeneratedMeals
  const searchHandler = () => {
    // HAVE TO use a state object for useLocation to work in '/meals'
    navigate("/meals", { state: { tags: params.tags, query: query } });
  };

  useEffect(() => {
    onChangeHandler();
    // If user is not logged in, redirect them back to Login & Registration
    if (!Cookies.get("usertoken")) {
      navigate("/");
    }

    // Retrieve data about the user logged in
    axios
      .get("http://localhost:8000/api/users/thisuser", {
        withCredentials: true,
      })
      .then((userData) => {
        const newStateObject = {
          tags: [],
          number: 0,
          query: "",
          dairyFreeIsChecked: userData.data.restrictions.includes("dairy free"),
          veganIsChecked: userData.data.restrictions.includes("vegan"),
          grainFreeIsChecked: userData.data.restrictions.includes("grain free"),
          ketoIsChecked: userData.data.restrictions.includes("keto"),
          whole30IsChecked: userData.data.restrictions.includes("whole30"),
        };

        const inputs = document.querySelectorAll("input[type='checkbox']");
        const newTags = [];
        inputs.forEach((input) => {
          const objectRestriction = input.id + "IsChecked";
          newStateObject[objectRestriction]
            ? (input.checked = true)
            : (input.checked = false);
          input.checked && newTags.push(input.value);
        });
        newStateObject.tags = newTags;
        setParams(newStateObject);
      })
      .catch((err) => console.log(err));

    // If user JUST logs in: success! TODO: ONLY TOAST WHEN FIRST LOGGED IN
    toast.success("You have successfully logged in!");
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container-sides">
        <div className="container">
          <div className="pt-4 mt-2">
            <h2>Feeling Hungry?</h2>
            <p>Search for your next meal below!</p>
          </div>
          {/* Restrictions div for the api call */}
          <div className="restrictions">
            <p>Restrictions:</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                checked={params.dairyFreeIsChecked}
                onChange={onChangeHandler}
                type="checkbox"
                id="dairyFree"
                value="dairy free"
              />
              <label className="form-check-label" htmlFor="dairyFree">
                Dairy Free
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                checked={params.veganIsChecked}
                onChange={onChangeHandler}
                type="checkbox"
                id="vegan"
                value="vegan"
              />
              <label className="form-check-label" htmlFor="vegan">
                Vegan
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                checked={params.grainFreeIsChecked}
                onChange={onChangeHandler}
                type="checkbox"
                id="grainFree"
                value="grain free"
              />
              <label className="form-check-label" htmlFor="grainFree">
                Grain Free
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                checked={params.ketoIsChecked}
                onChange={onChangeHandler}
                type="checkbox"
                id="keto"
                value="keto"
              />
              <label className="form-check-label" htmlFor="keto">
                Keto
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                checked={params.whole30IsChecked}
                onChange={onChangeHandler}
                type="checkbox"
                id="whole30"
                value="whole30"
              />
              <label className="form-check-label" htmlFor="whole30">
                Whole30
              </label>
            </div>
            {/* Search bar/btn htmlFor api call */}
            <div
              className="input-group rounded d-flex align-items-center pb-2"
              style={{ width: "26vw" }}
            >
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span
                className="input-group-text border-0 mb-1"
                id="search-addon"
              >
                <button
                  className="btn btn-primary"
                  onClick={searchHandler}
                  style={{ marginTop: "2px" }}
                >
                  <i className="fas fa-search"></i>
                  <span className="ms-2">Search</span>
                </button>
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="recipe-grid">
            <h2 className="my-4">My Recipe Book:</h2>
            <RecipeGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
