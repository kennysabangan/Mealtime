import { useEffect } from 'react';
import Navigation from "../components/Navigation";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    // If user is not logged in, redirect them back to Login & Registration
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }
    }, [])

    return (
        <div>
            <Navigation/>
        </div>
    )
}

export default Dashboard;