import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
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
      <h1>Settings Screen</h1>
      <p>User: {currentUser?.email}</p>
      <button onClick={() => navigate('/home')}>Go to Home</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;