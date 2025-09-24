import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! You have access to all administrative features.</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Add admin-specific content here */}
    </div>
  );
}

export default Admin;
