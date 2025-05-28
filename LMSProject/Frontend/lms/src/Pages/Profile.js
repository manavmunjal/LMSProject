import React from 'react';
import '../Styles/CustomerDetails.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Profile=()=>{

    const {logout} = useAuth();
    const navigate = useNavigate();

    const userLogout=()=>{
        logout();
        navigate("/");
    }
    return (
        <div>
            <div>
                <h1>Loan Management Application</h1>
                <h2>Login</h2>
            </div>
            <div>
                    <button type="submit" onClick={()=>userLogout()}>Logout</button>
                </div>
        </div>
    )
}

export default Profile;
