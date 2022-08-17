import axios from 'axios';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import noProfile from '../static/no-profile.png'
import favIcon from '../static/food-favicon.png'

const Navigation = () => {

    const [ pic, setPic ] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/users/logout`, { withCredentials: true })
            .then(() => navigate('/'))
            // .catch(err => console.log(err))
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER}/api/users/thisuser`, {
            withCredentials: true,
            })
            .then((userData) => {
                console.log(userData);
                    if (userData.data.pic) {
                        axios.post(`${process.env.REACT_APP_SERVER}/api/users/pic`, { user: userData.data }, { responseType: "arraybuffer" })
                        .then(res => {
                            let base64ImageString = Buffer.from(res.data, 'binary').toString('base64')
                            let srcValue = "data:image/png;base64,"+base64ImageString
                            setPic(srcValue)
                        })
                    }
            })
    }, [])

    return (
        // <!-- Navbar -->
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <!-- Container wrapper --> */}
            <div className="container">
                {/* <!-- Navbar brand --> */}
                <a className="navbar-brand me-2" href="/dashboard">
                <img
                    src={ favIcon }
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
                </ul>

                {/* <!-- Right links --> */}
                <div className="d-flex align-items-center">
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="light" className="px-3" style={{ padding: "5px", height: "36px"}}>
                            <img src={ pic ? pic : noProfile } className="me-2" height="25px" style={{ borderRadius: "50%", width: "25px", height: "25px", objectFit: "cover", objectPosition: "0% 15%" }}/>
                            My Profile
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <MDBDropdownItem href="/profile">View Profile</MDBDropdownItem>
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