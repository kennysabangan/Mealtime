import Navigation from "../components/Navigation";
import Cookies from "js-cookie";
import axios from 'axios';
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

  // Checkbox Functionality for Search
  const onChangeHandler = () => {
    const newStateObject = { ...params };
    const newTags = []

    var inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach(input => {
        const objectRestriction = input.id + "IsChecked";
        input.checked ? newStateObject[objectRestriction] = true : newStateObject[objectRestriction] = false
        input.checked && newTags.push(input.value)
    })

    newStateObject.tags = newTags;
    newStateObject.number = newTags.length;
    setParams(newStateObject); // Sets New State Object
  };

  // Search Button Pass Props to GeneratedMeals
  const searchHandler = () => {
    // HAVE TO use a state object for useLocation to work in '/meals'
    navigate('/meals', { state: { tags: params.tags, query: query } });
  }

  useEffect(() => {
    onChangeHandler();
    // If user is not logged in, redirect them back to Login & Registration
    if (!Cookies.get("usertoken")) {
      navigate("/");
    }

    // Retrieve data about the user logged in
    axios.get('http://localhost:8000/api/users/thisuser', { withCredentials: true })
    .then(userData => {
        const newStateObject = {
          tags: [],
          number: 0,
          query: "",
          dairyFreeIsChecked: userData.data.restrictions.includes('dairy free'),
          veganIsChecked: userData.data.restrictions.includes('vegan'),
          grainFreeIsChecked: userData.data.restrictions.includes('grain free'),
          ketoIsChecked: userData.data.restrictions.includes('keto'),
          whole30IsChecked: userData.data.restrictions.includes('whole30')
        }

        const inputs = document.querySelectorAll("input[type='checkbox']");
        const newTags = []
        inputs.forEach(input => {
            const objectRestriction = input.id + "IsChecked";
            newStateObject[objectRestriction] ? input.checked = true : input.checked = false
            input.checked && newTags.push(input.value)
        })
        newStateObject.tags = newTags;
        setParams(newStateObject);
    })
    .catch(err => console.log(err))

    // If user JUST logs in: success! TODO: ONLY TOAST WHEN FIRST LOGGED IN
    toast.success("You have successfully logged in!");
  }, []);

  return (
    <div className="dashboard-background">
      <Navigation />
      <div>
        <div className="container">
        <div className="container-dashboard px-4 pb-2 row mt-3 py-1 pb-2">
        <div className="col-md-6">
          <div className="pt-4">
            <h2>Feeling Hungry?</h2>
            <p className="px-2">Search for your next meal below!</p>
          </div>
              {/* Restrictions div for the api call */}
                <div className="restrictions">
                    <p className="px-2">Restrictions:</p>
                    <div className="form-check form-check-inline ms-2">
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
          <div className="input-group rounded d-flex align-items-center pb-2 mt-1" style={{ maxWidth: "20vw" }}>
            <input
              type="search"
              className="form-control rounded ms-2"
              style={{ minWidth: "10vw" }}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span className="input-group-text border-0 mb-1 ms-2" id="search-addon">
                <button
                    className="btn btn-primary"
                    onClick={searchHandler}
                    style={{ marginTop: "2px", marginRight: "-10px" }}
                >
                    <i className="fas fa-search"></i>
                    <span className="ms-2">Search</span>
                </button>
            </span>
            </div>
          </div>
      </div>
        <div className="col-md-6 py-1">
          <section className="d-flex align-items-center h-100">
            <div className="p-2 mt-2 featured-img">
              <img src="https://tse1.mm.bing.net/th?id=OIP.RzUzTGseSfB29CasSmPn6QHaHa&pid=Api" className="img-fluid shadow-1-strong" width="400" alt="placeholder image with fruits" />
            </div>

            <div className="card-body d-flex flex-column justify-content-center">
              <h2 style={{ marginTop: "-5px" }}>Most Favorited<i className="fas fa-utensils ms-2"></i></h2>
              <h5 className="card-title" >Smoked Salmon Eggs Benedict With Lemon Dill Hollandaise</h5>
              <p className="card-text">Rich and creamy eggs Benedict is a brunch classic for a good reason, brunch or not!</p>
              <button className="btn btn-primary" style={{ marginBottom: "-10px", width: "12rem" }}>
                <i className="fas fa-plus me-2"></i>
                 Add to My Recipes
              </button>
            </div>
          </section>
        </div>
    </div>
      <hr />

      <div className="container-dashboard row">
        <div className="recipe-grid px-3 pb-5">
        <h2 className="my-4 ms-2">My Recipe Book:</h2>
        <RecipeGrid />
        </div>
      </div>
      </div>
      </div>
      </div>
  );
};

export default Dashboard;
