// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import jwtDecode from 'jwt-decode';

const getAdminRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('Role:', role);
    return role;
  }
  return null;
};

const AdminRoutes = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/Login" />;
  }

  const userRole = getAdminRoleFromToken();
  if (userRole !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default AdminRoutes;
