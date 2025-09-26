import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Admin from "./Pages/Admin.js";
import Security from "./Pages/Security.js";
import Employee from "./Pages/Employee.js";
import SATDashboardPage from "./Pages/SATDashboard.js";
import SATModulePage from "./Pages/SATModulePage";
import SATPP from "./Pages/SATPP.js";
import SATPPVideos from "./Pages/SATPPVideos";
import SATPPInfographics from "./Pages/SATPPInfographics";
import SATPPSlides from "./Pages/SATPPSlides";
import SATPPQuizInfo from "./Pages/SATPPQuizInfo"; 
import PolicyManagementPage from "./Pages/PolicyManagementPage"; //nethupul
import UserPoliciesPage from "./Pages/UserPoliciesPage"; //nethupul
import SATPPQuiz from "./Pages/SATPPQuiz"; 
import SATTrainingHistory from "./Pages/SATTrainingHistory.js";
import Footer from "./Components/Footer.js";
import IncidentReportingPage from "./Pages/IncidentReportingPage.js";
import ReportSuccessPage from "./Pages/ReportSuccessPage.js";
import ReportSavedPage from "./Pages/ReportSavedPage.js";
import Navbar from "./Components/Navbar"; //nomasha
import logo from "./assets/logo.png";  //nomasha
import CTD from "./Pages/CTD"; //nomasha
import CTDPolicyAck from "./Pages/CTDPolicyAck"; //nomasha
import CTDTraining from "./Pages/CTDTraining"; //nomasha
import CTDIncSevere from "./Pages/CTDIncSevere"; //nomasha
import CTDComTrend from "./Pages/CTDComTrend"; //nomasha
import CTDCstmRpt from "./Pages/CTDCstmRpt"; //nomasha
import CTDAuditLogs from "./Pages/CTDAuditLogs"; //nomasha

function App() {
  const navigate = useNavigate(); // ✅ navigation hook
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/security" element={<Security />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/satdashboard" element={<SATDashboardPage />} />
          <Route path="/satmodule" element={<SATModulePage />} />
          <Route path="/satpp" element={<SATPP />} />
          <Route path="/satpp/videos" element={<SATPPVideos />} />
          <Route path="/satpp/infographics" element={<SATPPInfographics />} />
          <Route path="/satpp/slides" element={<SATPPSlides />} />
          <Route path="/satpp/quiz" element={<SATPPQuizInfo />} /> 
          <Route path="/satpp/quiz/start" element={<SATPPQuiz />} /> 
          <Route path="/history" element={<SATTrainingHistory />} />
          <Route path="/PolicyManagement" element={<PolicyManagementPage />} /> 
          <Route path="/user" element={<UserPoliciesPage />} />
          <Route path="/incident" element={<IncidentReportingPage />} />
          <Route path="/success" element={<ReportSuccessPage />} />
          <Route path="/reportsaved" element={<ReportSavedPage />} />
          {/* Nomasha */}
          <Route path="/dashboard" element={<CTD />} />
          <Route path="/ctd/policy-ack" element={<CTDPolicyAck />} />
          <Route path="/ctd/training-stats" element={<CTDTraining />} />
          <Route path="/ctd/incident-severity" element={<CTDIncSevere />} />
          <Route path="/ctd/compliance-trend" element={<CTDComTrend />} />
          <Route path="/ctd/custom-report" element={<CTDCstmRpt />} />
          <Route path="/ctd/audit-logs" element={<CTDAuditLogs />} />
          {/* Dev-only admin preview route (no nav link) */}
          <Route path="/ctd" element={<CTD />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;