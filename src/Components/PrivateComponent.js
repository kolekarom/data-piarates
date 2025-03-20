import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    // Check if the user is authenticated
    const auth = localStorage.getItem('user');

    // If authenticated, render the child routes via Outlet
    // Otherwise, redirect to the signup page
    return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;