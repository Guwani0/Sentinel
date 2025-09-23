import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Admin from "./Pages/Admin.js";
import Security from "./Pages/Security.js";
import Employee from "./Pages/Employee.js";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/security" element={<Security />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
}

export default App;