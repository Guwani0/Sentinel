import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

function Header({ user }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Header */}
      <header className="bg-black text-white shadow-md px-6 py-3 flex items-center justify-between relative z-10">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Sentinel Logo"
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate("/employee")}
          />
        </div>

        {/* Right: Search + Nav + Notifications + User */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Navigation links */}
          <nav className="flex gap-6">
            <button
              onClick={() => navigate("/satdashboard")}
              className="hover:text-purple-400"
            >
              Training
            </button>
            <button
              onClick={() => navigate("/policies")}
              className="hover:text-purple-400"
            >
              Policies
            </button>
            <button
              onClick={() => navigate("/incidents")}
              className="hover:text-purple-400"
            >
              Incidents
            </button>
          </nav>

          {/* Notifications */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative"
          >
            <BellIcon className="h-6 w-6 hover:text-purple-400" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>

          {/* User avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <UserCircleIcon className="h-8 w-8 text-purple-400" />
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-700">
                  <p className="font-semibold">{user?.username || "Employee"}</p>
                  <p className="text-sm text-gray-400">
                    {user?.email || "employee@example.com"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || "role"} • {user?.department || "department"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Curvy SVG Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 text-black"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default Header;
