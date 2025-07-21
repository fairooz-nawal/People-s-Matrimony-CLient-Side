import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { ContextAPI } from '../Component/ContextAPI/AuthProvider';
import Loading from '../Pages/Loading';


const ProtectedRoute = ({ children }) => {
    const { users, loading, setLoading } = useContext(ContextAPI);
    const location = useLocation();

   
    if (loading) {
        return <Loading></Loading>
    }
     if(!users) {
        setLoading(false);
        return <Navigate state={location?.pathname} to="/auth/login"></Navigate>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute;