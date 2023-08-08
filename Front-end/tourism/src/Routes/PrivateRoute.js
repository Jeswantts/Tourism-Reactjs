import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import jwtDecode from 'jwt-decode';

const getUserRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('Role:', role);
    return role;
  }
  return null;
};



const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/Login" />;
  }

  const userRole = getUserRoleFromToken(); 
  if (roles && roles.indexOf(userRole) === -1) {
    return <Navigate to="/Unauthorized" />;
  }

  return ( <Component {...rest} />);
};

export default PrivateRoute;
