import React from "react";

function SATPPVideos() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-purple-400 mb-4">
        Training Videos – Access Control & Password Policy
      </h1>
      <p className="text-gray-300 mb-8 max-w-4xl">
        Below are training videos divided into two categories:{" "}
        <span className="text-purple-300 font-semibold">Access Control</span>{" "}
        and{" "}
        <span className="text-purple-300 font-semibold">Password Security</span>.
        <br/>Each video includes a short description to help guide your learning.
      </p>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Access Control Column */}
        <div>
          <div className="bg-purple-800 rounded-lg p-3 mb-6 shadow-md">
            <h2 className="text-xl font-bold text-white text-left ml-1">
              Access Control
            </h2>
          </div>

          {/* Video 1 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              1. Introduction to Access Control
            </h3>
            <p className="text-gray-400 mb-3">
              An overview of access control systems and why they are critical
              for protecting sensitive military IT infrastructure.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/KKAoPqB1uxo"
              title="Access Control Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              2. Access Control Models
            </h3>
            <p className="text-gray-400 mb-3">
              Explains different access control models (DAC, MAC, RBAC) and how
              they apply to Army IT systems.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/2QTFiQVdrgg"
              title="Access Control Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 3 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              3. Implementing Access Control
            </h3>
            <p className="text-gray-400 mb-3">
              Practical guidance on enforcing access policies and using access
              control lists to safeguard information.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/Qa1KgvadVoE"
              title="Access Control Video 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Password Security Column */}
        <div>
          <div className="bg-purple-800 rounded-lg p-3 mb-6 shadow-md">
            <h2 className="text-xl font-bold text-white text-left ml-1">
              Password Security
            </h2>
          </div>

          {/* Video 1 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              1. Basics of Password Security
            </h3>
            <p className="text-gray-400 mb-3">
              Introduces password security concepts and why strong passwords are
              essential in preventing breaches.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/IhlXtBNNuKs"
              title="Password Security Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              2. Common Password Mistakes
            </h3>
            <p className="text-gray-400 mb-3">
              Explains weak password practices and how attackers exploit them,
              with tips to avoid these mistakes.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/BoyeFozmAXk"
              title="Password Security Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 3 */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white">
              3. Multi-Factor Authentication (MFA)
            </h3>
            <p className="text-gray-400 mb-3">
              Covers the importance of MFA and how it strengthens security
              beyond just passwords.
            </p>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/YitHISP0Isk"
              title="Password Security Video 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SATPPVideos;
