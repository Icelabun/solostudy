import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      // TODO: Replace with actual API call
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email,
          userType,
          username: email.split('@')[0],
          level: 1,
          exp: 0,
          attributes: null, // Attributes will be set during character creation
        },
      };

      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setUser(mockResponse.user);
      setIsNewUser(false);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData) => {
    try {
      // TODO: Replace with actual API call
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          ...userData,
          level: 1,
          exp: 0,
          attributes: null, // Attributes will be set during character creation
        },
      };

      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setUser(mockResponse.user);
      setIsNewUser(true);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      // TODO: Replace with actual API call
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      setIsNewUser(false);
    } catch (error) {
      throw new Error('Failed to update user data');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsNewUser(false);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isNewUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
