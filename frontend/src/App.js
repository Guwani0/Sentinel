import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Admin from "./Pages/Admin.js";
import Security from "./Pages/Security.js";
import Employee from "./Pages/Employee.js";
import SATDashboardPage from "./Pages/SATDashboard.js";
import SATModulePage from "./Pages/SATModulePage";
import IncidentReportingPage from "./Pages/IncidentReportingPage.js";
import ReportSuccessPage from "./Pages/ReportSuccessPage.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/security" element={<Security />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/satdashboard" element={<SATDashboardPage />} />
      <Route path="/satmodule" element={<SATModulePage />} />
      <Route path="/incident" element={<IncidentReportingPage />} />
      <Route path="/success" element={<ReportSuccessPage />} />
    </Routes>
  );
}

export default App;
