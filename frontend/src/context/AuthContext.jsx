import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {setItemWithExpiry, getItemWithExpiry} from '../utils/tokenExpiry'

// Create a context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const Backend_Url = "https://e-commerce-backend-a5jr.onrender.com";
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Transfer guest cart to user cart
  const transferGuestCartToUser = async (token) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length === 0) {
      return;
    }

    try {
      const res = await axios.post(`${Backend_Url}/cart/transfer`, { cart }, {
        headers: { token },
      });

      if (res.status === 200) {
        localStorage.removeItem('cart'); // Clear guest cart from local storage
      }
    } catch (error) {
      console.log(error);
    }
  };

  // login
  const login = async (loginData) => {
    try {
      const res = await axios.post(`${Backend_Url}/user/login`, loginData);
      if (res.status === 200) {
        toast.success('Login Successful !!!');
        setItemWithExpiry('authToken', res.data.token);
        transferGuestCartToUser(res.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  // signup
  const signup = async (registrationData) => {
    try {
      const res = await axios.post(`${Backend_Url}/user/signup`, registrationData);
      if (res.status === 200) {
        setItemWithExpiry('authToken', res.data.token);
        toast.success('Welcome, you are a new user');
        transferGuestCartToUser(res.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Signup failed");
    }
  };

  // logout
  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      toast.success("Logged Out");
    } catch (error) {
      toast.error("Logout Error");
      console.error("Logout error:", error);
    }
  };

  // is Authenticated
  const isAuthenticated = () => {
    if(getItemWithExpiry('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  // is Authorized
  const isAuthorized = async () => {
    const authToken = getItemWithExpiry('authToken');
    if (!authToken) {
      return false;
    }
    try {
      const res = await axios.post(`${Backend_Url}/auth/isAdmin`, { authToken });
      return res.status === 200 ? res.data.isAdmin : false;
    } catch (error) {
      console.error("Authorization check error:", error);
      return false;
    }
  }

  // checking isAdmin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await isAuthorized();
        setIsAdmin(result);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    checkAuth();
  }, [isAuthorized, navigate]);

  return (
    <AuthContext.Provider value={{ login, signup, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };