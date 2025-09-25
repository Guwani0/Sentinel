import React from "react";
import { Routes, Route } from "react-router-dom";
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
import SATPPQuiz from "./Pages/SATPPQuiz"; 
import SATTrainingHistory from "./Pages/SATTrainingHistory.js";
import Footer from "./Components/Footer.js";

function App() {
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
        </Routes>
      </div>

      {/* ✅ Footer on every page */}
      <Footer />
    </div>
  );
}

export default App;