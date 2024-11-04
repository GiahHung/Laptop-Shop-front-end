import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

const locationHelper = locationHelperBuilder({});

// Hook for checking if the user is authenticated
export const useIsAuthenticated = () => {
    // Using optional chaining to prevent errors if state.user is undefined
    return useSelector(state => state.user?.isLoggedIn ?? false); 
};

// UserIsAuthenticated component
export const UserIsAuthenticated = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

// UserIsNotAuthenticated component
export const UserIsNotAuthenticated = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    // Ensure the location object is defined
    if (!location) {
        console.error("Location is undefined.");
        return null; // or a loading state
    }

    const redirectPath = locationHelper.getRedirectQueryParam(location) || '/';

    // Check if isAuthenticated is a boolean
    if (typeof isAuthenticated !== 'boolean') {
        console.error("isAuthenticated is not defined properly:", isAuthenticated);
        return null; // or a loading state
    }

    // Redirect if authenticated
    if (isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};
