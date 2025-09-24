import React from "react";
import { useNavigate } from "react-router-dom";
import passwordImg from "../assets/images/password-security.jpg";

function SATModulePage() {
  const navigate = useNavigate();
  const completion = 40; // example completion

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 px-8 md:px-16">
        {/* Left side: Video/Image + completion bar */}
        <div className="relative w-full md:w-1/2 flex flex-col items-center bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          {/* Background Image */}
          <div
            className="w-full h-64 md:h-96 bg-cover bg-center"
            style={{
              backgroundImage: `url(${passwordImg})`,
            }}
          ></div>

          {/* Completion Bar */}
          <div className="w-full p-4 bg-black bg-opacity-70 flex items-center justify-between">
            <span className="text-sm text-gray-300">Completion</span>
            <div className="w-3/4 bg-gray-700 rounded-full h-3 mx-4">
              <div
                className="bg-purple h-3 rounded-full"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-300">{completion}%</span>
          </div>
        </div>

        {/* Right side: Content */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-12">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            Access Control & Password Policy
          </h1>
          <p className="text-gray-300 mb-6 text-lg">
            Learn how to secure accounts and mission systems with strong
            authentication. This module explains password creation rules,
            enforcing multi-factor authentication (MFA), and the Army IT
            Department’s security standards. You’ll gain knowledge on how
            access policies protect sensitive data from unauthorized users.
          </p>
          <button
            onClick={() => navigate("/satpp")}   
            className="px-6 py-3 bg-purple text-white text-lg rounded-lg hover:bg-[#6c009c]"
          >
            Start Training
          </button>
        </div>
      </div>
    </div>
  );
}

export default SATModulePage;
