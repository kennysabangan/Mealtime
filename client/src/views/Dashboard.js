import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RecipeGrid from "../components/RecipeGrid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    tags: [],
    number: 0,
    dairyFreeIsChecked: false,
    veganIsChecked: false,
    grainFreeIsChecked: false,
    ketoIsChecked: false,
    whole30IsChecked: false,
  });

  // Checkbox Functionality for Search
  const onChangeHandler = (e) => {
    const newStateObject = { ...params };
    const restriction = e.target.id + "IsChecked"; // ex: dairyFree + IsChecked = dairyFreeIsChecked
    newStateObject[restriction] = e.target.checked; // newStateObject.dairyFreeIsChecked = <Whatever Checkbox is Right Now>

    // If 1) Box is Checked and 2) The tag doesn't exist in our array => add in the tag
    if (newStateObject[restriction] && !newStateObject['tags'].includes(newStateObject[e.target.value])) {
      newStateObject['tags'] = [...newStateObject['tags'], e.target.value]
    }

    // If 1) Box is NOT Checked and 2) The tag DOES exist in our array => remove / filter it out
    if (!e.target.checked && newStateObject['tags'].includes(e.target.value)) {
        newStateObject['tags'] = newStateObject['tags'].filter(tag => tag != e.target.value)
    }

    newStateObject['number'] = newStateObject['tags'].length; // Counts number of tags
    setParams(newStateObject); // Sets New State Object
  };

  // Search Button Pass Props to GeneratedMeals
  const search = () => {
    // HAVE TO use a state object for useLocation to work in '/meals'
    navigate('/meals', { state: { tags: params.tags } });
  }

  useEffect(() => {
    // If user is not logged in, redirect them back to Login & Registration
    if (!Cookies.get("usertoken")) {
      navigate("/");
    }

    // If user JUST logs in: success! TODO: ONLY TOAST WHEN FIRST LOGGED IN
    toast.success("You have successfully logged in!");
  }, []);

  return (
    <div>
      <Navigation />
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
            />
            <span className="input-group-text border-0 mb-1" id="search-addon">
                <button
                    className="btn btn-primary"
                    onClick={search}
                    style={{ marginTop: "2px" }}
                >
                    <i className="fas fa-search"></i>
                    <span className="ms-2">Search</span>
                </button>
            </span>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container">
        <h2 className="my-4">My Recipe Book:</h2>
        <RecipeGrid />
      </div>
    </div>
  );
};

export default Dashboard;
