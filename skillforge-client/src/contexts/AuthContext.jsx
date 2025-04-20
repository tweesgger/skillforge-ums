import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../services/api'; // Make sure API is configured correctly as I explain below

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    const decoded = jwtDecode(response.data.token); // corrected jwt_decode to jwtDecode
    setUser(decoded);
     // Role-based navigation
     if (decoded.role === 'user') {
      navigate('/dashboard');
    } else if (['admin', 'manager'].includes(decoded.role)) {
      navigate('/admin');
    } else {
      // Handle unexpected roles
      navigate('/');
    }
  };

  const register = async (username, email, password, role) => {
    await API.post('/auth/register', { username, email, password, role });
    navigate('/login');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
