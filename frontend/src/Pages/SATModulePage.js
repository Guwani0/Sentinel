import React from "react";
import { useNavigate } from "react-router-dom";

function SATModulePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-purple text-white rounded hover:bg-[#6c009c]"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-purple-400">
        Access Control & Password Policy
      </h1>
      <p className="mt-3 text-gray-300 max-w-3xl">
        Learn how to secure accounts and mission systems with strong
        authentication. This module covers best practices in password security
        and military-grade access control policies.
      </p>

      <div className="mt-8 space-y-6">
        <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">[ Training Video Placeholder ]</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">
            Key Learning Points
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Use strong, unique passwords with 12+ characters.</li>
            <li>Enable Multi-Factor Authentication (MFA).</li>
            <li>Change passwords regularly and avoid reuse.</li>
            <li>Follow Army IT password policy guidelines.</li>
          </ul>
        </div>

        <button className="px-6 py-3 bg-purple text-white rounded-lg hover:bg-[#6c009c]">
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default SATModulePage;
