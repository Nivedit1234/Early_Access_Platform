// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/screens/Homepage';
import Register from './components/screens/Signup';
import Login from './components/screens/Login';
import GameContent from './components/GameContent';
import axiosInstance from './components/screens/axiosConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    // Only run checkAuth if user is supposed to be authenticated
    // if (localStorage.getItem('isAuthenticated') === 'true') {
    //   checkAuth();
    // }
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/check-auth');
        if (response.status === 200) {
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      }
      // Only run checkAuth if user is supposed to be authenticated

      if (localStorage.getItem('isAuthenticated') === 'true') {
        checkAuth();
      }
    };
  }, []);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/game-content'
          element={isAuthenticated ? <GameContent /> : <Navigate to='/login' />}
        />
      </Routes>
    </Router>
  );
};

export default App;
