import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth} from '../Contexts/AuthContext';

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    if(!user){
        return  <Navigate to="/" replace/>
    }
    else return children
}

export default ProtectedRoute;