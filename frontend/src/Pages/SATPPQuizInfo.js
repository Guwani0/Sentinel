import React from "react";
import { useNavigate } from "react-router-dom";
import quizImg from "../assets/images/test.webp";

function SATPPQuizInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center p-10">
      {/* Left side: Quiz details */}
      <div className="md:w-1/2 md:pr-12">
        <h1 className="text-5xl font-bold text-purple-400 mb-6">
          Access Control & Password Policy – Quiz
        </h1>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Test your knowledge of{" "}
          <span className="text-purple-300 font-semibold">
            access control and password security policies
          </span>{" "}
          in the Army IT Department. <br /> <br />
          The quiz includes multiple-choice, short answer, and
          scenario-based simulation questions. <br /> <br />
          <span className="font-semibold text-purple-300">10 Questions</span> ·{" "}
          <span className="font-semibold text-purple-300">100 Points</span>
        </p>
        <button
          onClick={() => navigate("/satpp/quiz/start")}
          className="px-8 py-4 bg-purple text-white text-lg rounded-lg hover:bg-[#6c009c] transition"
        >
          🚀 Start Quiz
        </button>
      </div>

      {/* Right side: Illustration */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <div className="w-full max-w-md">
          <img
            src={quizImg}
            alt="Quiz Illustration"
            className="w-full rounded-lg shadow-lg border border-gray-700"
          />
          <p className="text-gray-400 text-center">
              Be ready! Completing this quiz is the final step to earn your
              certificate for this training module.
            </p>
        </div>
      </div>
    </div>
  );
}

export default SATPPQuizInfo;
