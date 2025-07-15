import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { trainModel, predictClass } from './chatbot/model';
import LoginPage from './LoginPage';
import Chatbot from './chatbot/chatbot_page';
import AdminDashboard from './admin_dashbord/pages/Dashbord'; 
import UserDashboard from './user_dashbord/pages/Dashboard'; 
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
       axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(response => {
        const userRole = response.data.role;
        setRole(userRole);
        localStorage.setItem('role', userRole); 
      })
      .catch(error => {
        console.error('Failed to fetch user role:', error);
        setIsAuthenticated(false); 
      });
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(true);
    axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const userRole = response.data.role;
      setRole(userRole);
      localStorage.setItem('role', userRole);
    })
    .catch(error => {
      console.error('Failed to fetch role after login:', error);
    });
  };
    return (
      <Router> {/* ✅ Wrap everything here */}
      {isAuthenticated && !role && <div>Loading dashboard...</div>}

      {!isAuthenticated && <LoginPage onLogin={handleLogin} />}

      {isAuthenticated && role === 'admin' && <AdminDashboard />}

      {isAuthenticated && role === 'user' && <UserDashboard />}

      {isAuthenticated && role !== 'admin' && role !== 'user' && <div>Unknown role</div>}
    </Router>
    );
}


export default App;
