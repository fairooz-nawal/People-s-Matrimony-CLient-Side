import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { ContextAPI } from '../Component/ContextAPI/AuthProvider';
import Loading from '../Pages/Loading';

const AdminProtectedRoute = ({ children }) => {
     const { users, role, loading, setLoading } = useContext(ContextAPI);
      if (loading) {
        return <Loading></Loading>
    }
    console.log(role)
     if(!users && role !== 'admin') {
        setLoading(false);
        return <Navigate state={location?.pathname} to="/auth/login"></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminProtectedRoute;