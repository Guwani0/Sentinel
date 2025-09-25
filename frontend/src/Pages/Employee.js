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
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
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
            onClick={() => navigate("/training-portal")}
            className="feature-btn w-full flex items-center gap-3"
          >
            <AcademicCapIcon className="h-5 w-5" /> Training Portal
          </button>
          <button
            onClick={() => navigate("/training-history")}
            className="feature-btn w-full flex items-center gap-3"
          >
            <ChartBarIcon className="h-5 w-5" /> Training History
          </button>
          <button
            onClick={() => navigate("/policies")}
            className="feature-btn w-full flex items-center gap-3"
          >
            <DocumentTextIcon className="h-5 w-5" /> Policies
          </button>
          <button
            onClick={() => navigate("/incidents")}
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

        {/* Training Progress */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-purple-400 mb-3">
            Training Progress
          </h2>
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div
              className="bg-purple-500 h-4 rounded-full"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{completion}% completed</p>
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
            onClick={() => navigate("/training-history")}
            className="feature-btn cursor-pointer flex flex-col items-center p-6"
          >
            <ChartBarIcon className="h-10 w-10 mb-3" />
            <h2 className="text-lg font-bold">Training History</h2>
            <p className="text-sm">Review your completion records.</p>
          </div>
          <div
            onClick={() => navigate("/policies")}
            className="feature-btn cursor-pointer flex flex-col items-center p-6"
          >
            <DocumentTextIcon className="h-10 w-10 mb-3" />
            <h2 className="text-lg font-bold">Policies</h2>
            <p className="text-sm">View and acknowledge IT policies.</p>
          </div>
          <div
            onClick={() => navigate("/incidents")}
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
        </div>
      </main>

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
