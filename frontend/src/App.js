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
      <Route path="/satpp" element={<SATPP />} />
      <Route path="/satpp/videos" element={<SATPPVideos />} />
      <Route path="/satpp/infographics" element={<SATPPInfographics />} />
      <Route path="/satpp/slides" element={<SATPPSlides />} />
      <Route path="/satpp/quiz" element={<SATPPQuizInfo />} /> 
      <Route path="/satpp/quiz/start" element={<SATPPQuiz />} /> 
    </Routes>
  );
}

export default App;
