import React from 'react';
import { useNavigate } from 'react-router-dom';

function Security() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Security Dashboard</h1>
      <p>Welcome, Security Officer! Manage security operations here.</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Add security-specific content here */}
    </div>
  );
}

export default Security;
