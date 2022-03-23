import Navigation from "../components/Navigation";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Dashboard = () => {

    const navigate = useNavigate();

    // If user is not logged in, redirect them back to Login & Registration
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        toast.success('You have successfully logged in!')
    }, [])

    return (
        <div>
            <Navigation/>
        </div>
    )
}

export default Dashboard;