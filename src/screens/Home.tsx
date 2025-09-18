import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div>
      <h1>Home Screen</h1>
      <p>Welcome, {currentUser?.email}!</p>
      <button onClick={() => navigate('/settings')}>Go to Settings</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;