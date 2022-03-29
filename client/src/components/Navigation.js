import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const Navigation = () => {

    const navigate = useNavigate();

    const logout = () => {
        axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        // <!-- Navbar -->
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <!-- Container wrapper --> */}
            <div className="container">
                {/* <!-- Navbar brand --> */}
                <a className="navbar-brand me-2" href="/dashboard">
                <img
                    src="food-favicon.png"
                    height="30"
                    loading="lazy"
                />
                </a>

                {/* <!-- Left links --> */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/meals">Find Random Meal</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/addrecipe">Add Recipe</a>
                    </li>
                </ul>

                {/* <!-- Right links --> */}
                <div className="d-flex align-items-center">
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="light">
                            <img src={require('../static/no-profile.png')} className="me-2" height="20px"/>
                            My Profile
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <MDBDropdownItem href="/profile">View Profile</MDBDropdownItem>
                            <MDBDropdownItem href="/recipes">View Recipes</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <button onClick={logout} type="button" className="btn btn-primary ms-3 me-2">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;