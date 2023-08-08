import axios from 'axios';
import { useAuth } from './AuthContext';

const AuthMiddleware = () => {
  const { token } = useAuth();

  axios.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : null;

  return null;
};

export default AuthMiddleware;
