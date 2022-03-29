import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginRegistration = () => {

    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('usertoken')) {
            navigate('/dashboard');
        }

        document.querySelectorAll('.form-outline').forEach((formOutline) => {
            new mdb.Input(formOutline).init();
        });
    }, [])

    const login = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/login', {
            email: loginEmail,
            password: loginPassword
        }, { withCredentials: true })
            .then(() => { navigate("/dashboard"); console.log("success"); })
            .catch(() => {
                setErrors({ login: { message: "Invalid credentials. Note: Passwords are case-sensitive." }});
                setLoginPassword("");
            })
    }

    const register = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', {
            firstName, lastName, email, password, confirmPassword
        }, { withCredentials: true })
            .then(() => navigate("/dashboard"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div className="login-registration">
            <div className="container d-flex align-items-center" style={{ height: "85vh" }}>
                <div className="col-md-4">

                    {/* Pills navs */}
                    <ul className="nav nav-pills nav-justified mb-3" role="tablist">
                    <h1 className="display-5 mb-4">Take out stress from your mealtime.</h1>
                    <li className="nav-item" role="presentation">
                        <a
                        className="nav-link btn-shadow active"
                        style={{ backgroundColor: "#48BD8F" }}
                        id="tab-login"
                        data-mdb-toggle="pill"
                        href="#pills-login"
                        role="tab"
                        aria-controls="pills-login"
                        aria-selected="true"
                        >Login</a>
                    </li>
                    <li className="nav-item" role="presentation" style={{ marginRight: "-8px" }}>
                        <a
                        className="nav-link btn-shadow"
                        style={{ backgroundColor: "#48BD8F" }}
                        id="tab-register"
                        data-mdb-toggle="pill"
                        href="#pills-register"
                        role="tab"
                        aria-controls="pills-register"
                        aria-selected="false"
                        >Register</a>
                    </li>
                    </ul>
                    {/* Pills navs */}

                    {/* Pills content */}
                    <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form>

                        {errors.login ? <div className="text-danger mb-3">* {errors.login.message}</div> : null}
                        {/* Email input */}
                        <div className="form-outline mb-4">
                            <input type="email" className="form-control" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}/>
                            <label className="form-label">Email address</label>
                        </div>

                        {/* Password input */}
                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                            <label className="form-label">Password</label>
                        </div>

                        {/* Submit button */}
                        <button onClick={login} className="btn btn-block mb-4 btn-shadow" style={{ backgroundColor: "#48BD8F" }}>Sign in</button>

                        </form>
                    </div>
                    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form>

                        {/* Validation Errors */}
                        {errors.firstName ? <div className="text-danger mb-2">* {errors.firstName.message}</div> : null}
                        {errors.lastName ? <div className="text-danger mb-2">* {errors.lastName.message}</div> : null}
                        {errors.email ? <div className="text-danger mb-2">* {errors.email.message}</div> : null}
                        {errors.password ? <div className="text-danger mb-2">* {errors.password.message}</div> : null}
                        {errors.confirmPassword ? <div className="text-danger mb-2">* {errors.confirmPassword.message}</div> : null}

                        {/* First Name input */}
                        <div className="form-outline mb-4 mt-3">
                            <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <label className="form-label">First Name</label>
                        </div>

                        {/* Last Name input */}
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                            <label className="form-label">Last Name</label>
                        </div>

                        {/* Email input */}
                        <div className="form-outline mb-4">
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                            <label className="form-label">Email</label>
                        </div>

                        {/* Password input */}
                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                            <label className="form-label">Password</label>
                        </div>

                        {/* Repeat Password input */}
                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                            <label className="form-label">Confirm password</label>
                        </div>

                        {/* Submit button */}
                        <button onClick={register} className="btn btn-block mb-3" style={{ backgroundColor: "#48BD8F" }}>Register</button>

                        </form>
                    </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginRegistration;