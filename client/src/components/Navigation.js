import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            {/* <!-- Toggle button --> */}
            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarButtonsExample"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
            <i className="fas fa-bars"></i>
            </button>


                {/* <!-- Left links --> */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                </ul>

                {/* <!-- Right links --> */}
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-link px-3 me-2">
                        My Profile
                    </button>
                    <button onClick={logout} type="button" className="btn btn-link px-3 me-2">
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default Navigation;