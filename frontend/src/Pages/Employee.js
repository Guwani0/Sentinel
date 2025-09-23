import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>Welcome, Employee! Access your work-related features.</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Add employee-specific content here */}
    </div>
  );
}

export default Employee;
