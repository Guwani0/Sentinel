import React from "react";
import {
  ClipboardDocumentCheckIcon,
  PlayCircleIcon,
  PhotoIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"; // ✅ import header

function SATPP() {
  const completion = 40; // Example progress %
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ✅ Global Header */}
      <Header user={{ username: "Employee", role: "employee" }} />

      {/* Hero Intro Block */}
      <div className="relative w-full py-10 px-6 md:px-16 bg-purple-900 bg-opacity-70 rounded-lg mb-8">
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Access Control & Password Policy
          </h1>
          <p className="text-white text-lg mb-3 text-justify">
            This module provides essential knowledge on access control
            mechanisms and <br /> password management policies in the Army IT
            Department. It includes training <br /> videos, infographics, and
            slides to help you understand the best practices.
          </p>
        </div>

        {/* Progress bar neatly anchored bottom-right */}
        <div className="absolute bottom-4 right-6 w-96">
          <p className="text-sm text-white mb-1">Completion</p>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-purple-400 h-3 rounded-full"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{completion}%</p>
        </div>
      </div>

      {/* Training Resource Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Videos Card */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-md p-6 flex flex-col items-center text-center">
          <PlayCircleIcon className="h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-xl font-bold text-purple-400 mb-2">Videos</h2>
          <p className="text-gray-300 flex-1">
            Short training videos that explain password best practices and how
            to apply them in Army IT systems.
          </p>
          <button
            onClick={() => navigate("/satpp/videos")}
            className="mt-4 w-full px-4 py-2 bg-purple text-white rounded hover:bg-[#6c009c]"
          >
            Watch Videos
          </button>
        </div>

        {/* Infographics Card */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-md p-6 flex flex-col items-center text-center">
          <PhotoIcon className="h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-xl font-bold text-purple-400 mb-2">
            Infographics
          </h2>
          <p className="text-gray-300 flex-1">
            Visual guides summarizing the dos and don’ts of password security
            and access control.
          </p>
          <button
            onClick={() => navigate("/satpp/infographics")}
            className="mt-4 w-full px-4 py-2 bg-purple text-white rounded hover:bg-[#6c009c]"
          >
            View Infographics
          </button>
        </div>

        {/* Slides Card */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-md p-6 flex flex-col items-center text-center">
          <DocumentTextIcon className="h-16 w-16 text-purple-400 mb-4" />
          <h2 className="text-xl font-bold text-purple-400 mb-2">Slides</h2>
          <p className="text-gray-300 flex-1">
            Detailed training slides covering access control policies, password
            rules, and real-world use cases.
          </p>
          <button
            onClick={() => navigate("/satpp/slides")}
            className="mt-4 w-full px-4 py-2 bg-purple text-white rounded hover:bg-[#6c009c]"
          >
            View Slides
          </button>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="px-6 pb-10 flex justify-start">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-md flex items-center justify-between w-full max-w-4xl">
          <div className="flex items-center gap-4">
            <ClipboardDocumentCheckIcon className="h-10 w-10 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-purple-400">
                Complete the Module
              </h2>
              <p className="text-gray-300">
                Take the final quiz to complete this training and obtain your
                certificate.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/satpp/quiz")}
            className="px-6 py-3 bg-purple text-white rounded-lg hover:bg-[#6c009c]"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default SATPP;
