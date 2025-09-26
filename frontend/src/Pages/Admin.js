import Header from "../Components/Header"; // ⬅️ import your Header
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Admin() {
  const navigate = useNavigate();

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Dummy user info for Header
  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Admin",
    email: "admin@example.com",
    role: "admin",
    department: "IT Department",
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <Header user={user} />

      {/* Body: sidebar + main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-6 text-2xl font-bold text-purple-400">Sentinel</div>
          <nav className="flex-1 space-y-2 px-3">
            <button
              onClick={() => navigate("/admin")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <ChartBarIcon className="h-5 w-5" /> Dashboard
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <ShieldCheckIcon className="h-5 w-5" /> Compliance Tracking
            </button>
            <button
              onClick={() => navigate("/PolicyManagement")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <DocumentTextIcon className="h-5 w-5" /> Policy Management
            </button>
            <button
              onClick={() => navigate("/reportsaved")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <ExclamationTriangleIcon className="h-5 w-5" /> Incident Reporting
            </button>
            <button
              onClick={() => navigate("/training")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <AcademicCapIcon className="h-5 w-5" /> Security Training
            </button>
            <button
              onClick={() => navigate("/users")}
              className="feature-btn w-full flex items-center gap-3 justify-center"
            >
              <UsersIcon className="h-5 w-5" /> User Management
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
            Admin Dashboard
          </h1>

          {/* Overview Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h2 className="text-sm font-medium text-gray-400">
                Compliance Rate
              </h2>
              <p className="text-2xl font-bold text-purple-400">92%</p>
              <p className="text-xs text-gray-500">Across all units</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h2 className="text-sm font-medium text-gray-400">
                Reported Incidents
              </h2>
              <p className="text-2xl font-bold text-red-400">8</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h2 className="text-sm font-medium text-gray-400">
                Pending Acknowledgments
              </h2>
              <p className="text-2xl font-bold text-yellow-400">15</p>
              <p className="text-xs text-gray-500">Policies awaiting review</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h2 className="text-sm font-medium text-gray-400">
                Training Completion
              </h2>
              <p className="text-2xl font-bold text-green-400">78%</p>
              <p className="text-xs text-gray-500">Of assigned users</p>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/dashboard")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <ShieldCheckIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Compliance Tracking</h2>
              <p className="text-sm">Monitor compliance across units.</p>
            </div>
            <div
              onClick={() => navigate("/PolicyManagement")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <DocumentTextIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Policy Management</h2>
              <p className="text-sm">Publish and manage IT policies.</p>
            </div>
            <div
              onClick={() => navigate("/reportsaved")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <ExclamationTriangleIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Incident Reporting</h2>
              <p className="text-sm">Log and track incidents.</p>
            </div>
            <div
              onClick={() => navigate("/training")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <AcademicCapIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">Security Training</h2>
              <p className="text-sm">Manage modules and progress.</p>
            </div>
            <div
              onClick={() => navigate("/users")}
              className="feature-btn cursor-pointer flex flex-col items-center p-6"
            >
              <UsersIcon className="h-10 w-10 mb-3" />
              <h2 className="text-lg font-bold">User Management</h2>
              <p className="text-sm">Assign roles and permissions.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Feature button CSS */}
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

export default Admin;
