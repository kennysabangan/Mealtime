import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RecipeGrid from "../components/RecipeGrid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [prams, setParams] = useState({
    tags: "",
    number: "3",
    dairyFreeIsChecked: false,
    veganIsChecked: false,
    grainFreeIsChecked: false,
    ketoIsChecked: false,
    whole30IsChecked: false,
  });

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  // If user is not logged in, redirect them back to Login & Registration
  const oChangeHandler = (e) => {
    //let tempParms = "";
    //tempParms = tempParms + e.target.value;
    const newStateObject = { ...prams };
    if (newStateObject[e.target.name]) {
      console.log("devlog");
      newStateObject[e.target.name] = false;
      newStateObject.tags.filter;
      setParams(newStateObject);
    } else {
      newStateObject[e.target.name] = true;
      newStateObject.tags = newStateObject.tags + "," + e.target.value;
      setParams(newStateObject);
    }
  };
  useEffect(() => {
    if (!Cookies.get("usertoken")) {
      navigate("/");
    }

    toast.success("You have successfully logged in!");
  }, []);

  //params: {tags: 'dairy free,grain free, vegan', number: '3'}

  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="pt-4 mt-2">
          <h2>Feeling Hungry?</h2>
          <p>Search htmlFor your next meal below!</p>
        </div>

        {/* Restrictions div htmlFor the api call */}
        <div className="restrictions">
          <p>Restrictions:</p>
          <div className="form-check form-check-inline">
            <input
              name="dairyFreeIsChecked"
              onChange={oChangeHandler}
              className="form-check-input"
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
              name="veganIsChecked"
              onChange={oChangeHandler}
              className="form-check-input"
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
              name="grainFreeIsChecked"
              onChange={oChangeHandler}
              className="form-check-input"
              type="checkbox"
              id="grainFree"
              value="grainFree"
            />
            <label className="form-check-label" htmlFor="grainFree">
              Grain Free
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              name="ketoIsChecked"
              onChange={oChangeHandler}
              className="form-check-input"
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
              name="whole30IsChecked"
              onChange={oChangeHandler}
              className="form-check-input"
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
              <a
                className="btn"
                style={{ marginTop: "2px", backgroundColor: "#48BD8F" }}
              >
                <i className="fas fa-search"></i>
                <span className="ms-2">Search</span>
              </a>
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
