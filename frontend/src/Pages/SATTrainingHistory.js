import React, { useState } from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header"; // ✅ import Header

// Training data lives here
const trainingModules = [
  {
    id: "1",
    title: "Access Control & Password Security",
    desc: "Secure accounts and mission systems with strong authentication.",
    date: "2025-01-15",
    status: "completed",
  },
  {
    id: "2",
    title: "Phishing & Malware Defense",
    desc: "Identify hostile cyber campaigns and defend against phishing attacks.",
    date: "2025-02-10",
    status: "inprogress",
  },
  {
    id: "3",
    title: "Military Network & Device Security",
    desc: "Protect field and HQ devices, VPNs, and secure communication channels.",
    date: "2025-02-20",
    status: "notstarted",
  },
  {
    id: "4",
    title: "Data Classification & Confidentiality",
    desc: "Handle Confidential, Secret, and Top Secret information correctly.",
    date: "2025-03-01",
    status: "completed",
  },
  {
    id: "5",
    title: "Incident Reporting Protocols",
    desc: "Follow the chain of command to report cyber incidents.",
    date: "2025-03-10",
    status: "inprogress",
  },
  {
    id: "6",
    title: "Insider Threat & Social Engineering",
    desc: "Detect and prevent manipulation, infiltration, and insider risks.",
    date: "2025-03-20",
    status: "notstarted",
  },
];

// progress helper
function getProgress(status) {
  if (status === "completed") return 100;
  if (status === "inprogress") return 50;
  return 0;
}

function getStatusColor(status) {
  if (status === "completed") return "bg-green-700 text-green-200";
  if (status === "inprogress") return "bg-yellow-700 text-yellow-200";
  return "bg-gray-700 text-gray-200";
}

export default function SATTrainingHistory() {
  const [activeTab, setActiveTab] = useState("completed"); // default

  const filteredModules = trainingModules.filter(
    (m) => m.status === activeTab
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ✅ Global Header */}
      <Header user={{ username: "Employee", role: "employee" }} />

      <div className="p-6">
        <h1 className="text-5xl font-bold mb-6 text-purple-400 text-left">
          Training History
        </h1>

        {/* Horizontal Tabs */}
        <div className="flex justify-start gap-4 mb-6">
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium ${
              activeTab === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            ✅ Completed
          </button>
          <button
            onClick={() => setActiveTab("inprogress")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium ${
              activeTab === "inprogress"
                ? "bg-yellow-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            ⏳ In Progress
          </button>
          <button
            onClick={() => setActiveTab("notstarted")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium ${
              activeTab === "notstarted"
                ? "bg-gray-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            ❌ Not Started
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => {
              const progress = getProgress(module.status);

              return (
                <div
                  key={module.id}
                  className="border border-purple-600 rounded-xl p-6 bg-gray-900 shadow-md"
                >
                  {/* Title + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{module.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                        module.status
                      )}`}
                    >
                      {module.status === "completed"
                        ? "Completed"
                        : module.status === "inprogress"
                        ? "In Progress"
                        : "Not Started"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-3">{module.desc}</p>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                    {module.status === "completed" ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      <ClockIcon className="h-5 w-5 text-yellow-400" />
                    )}
                    <span>Last accessed: {module.date}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        module.status === "completed"
                          ? "bg-green-500"
                          : module.status === "inprogress"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Progress label */}
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {progress}% Complete
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No trainings in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
