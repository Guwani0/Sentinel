import Header from "../Components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { trainingModules } from "./SATDashboard";

function Employee() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "Employee", role: "employee" });
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    if (trainingModules && trainingModules.length > 0) {
      const completed = trainingModules.filter(
        (m) => m.status === "completed"
      ).length;
      const percent = Math.round((completed / trainingModules.length) * 100);
      setCompletion(percent);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header always on top */}
      <Header user={user} />

      {/* Body: sidebar + main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col rounded-lg">
          <div className="p-6 text-xl font-bold text-purple-400">
            {user.username}
          </div>
          <div className="px-6 text-sm text-gray-400 mb-4">{user.role}</div>
          <nav className="flex-1 space-y-2 px-3">
            <button
              onClick={() => navigate("/employee")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <ChartBarIcon className="h-5 w-5" /> Dashboard
            </button>
            <button
              onClick={() => navigate("/satdashboard")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <AcademicCapIcon className="h-5 w-5" /> Training Portal
            </button>
            <button
              onClick={() => navigate("/history")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <ChartBarIcon className="h-5 w-5" /> Training History
            </button>
            <button
              onClick={() => navigate("/user")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <DocumentTextIcon className="h-5 w-5" /> Policies
            </button>
            <button
              onClick={() => navigate("/incident")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <ExclamationTriangleIcon className="h-5 w-5" /> Incident Reporting
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="feature-btn w-full flex items-center gap-3"
            >
              <BellIcon className="h-5 w-5" /> Notifications
            </button>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-black">
          <h1 className="text-3xl font-bold text-purple-400 mb-6">
            Employee Dashboard
          </h1>

          {/* User Profile Header */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8 flex items-center gap-6">
            {/* User Icon */}
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-bold text-purple-400">
                {user.username}
              </h2>
              <p className="text-gray-300 text-sm">
                📧 {user.email || "employee@example.com"}
              </p>
              <p className="text-gray-400 text-sm">Role: {user.role}</p>
              <p className="text-gray-400 text-sm">
                Department: {user.department || "IT Department"}
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/satdashboard")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <AcademicCapIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Training Portal</h2>
              <p className="text-sm">Explore and complete modules.</p>
            </div>
            <div
              onClick={() => navigate("/history")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <ChartBarIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Training History</h2>
              <p className="text-sm">Review your completion records.</p>
            </div>
            <div
              onClick={() => navigate("/user")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <DocumentTextIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Policies</h2>
              <p className="text-sm">View and acknowledge IT policies.</p>
            </div>
            <div
              onClick={() => navigate("/incident")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <ExclamationTriangleIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Incident Reporting</h2>
              <p className="text-sm">Report and monitor incidents.</p>
            </div>
            <div
              onClick={() => navigate("/notifications")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <BellIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Notifications</h2>
              <p className="text-sm">Check alerts and updates.</p>
            </div>
            <div
              onClick={() => navigate("/certifications")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <AcademicCapIcon className="h-10 w-10 mb-3 " />
              <h2 className="text-lg font-bold">Certifications</h2>
              <p className="text-sm">View and download earned certificates.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Same CSS as Home page feature cards */}
      <style>{`
        .feature-btn {
          min-width: 200px;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          background: linear-gradient(145deg, #111, #3a0044);
          color: #fff;
          box-shadow: 0 0 10px rgba(113,27,181,0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 25px rgba(113,27,181,0.8);
        }
      `}</style>
    </div>
  );
}

export default Employee;
