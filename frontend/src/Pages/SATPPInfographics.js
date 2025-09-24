import React, { useState } from "react";
import {
  ShieldCheckIcon,
  KeyIcon,
} from "@heroicons/react/24/outline"; // Icons
import swImg from "../assets/images/strong-weak-pw.webp";
import wpImg from "../assets/images/weak-pw.png";
import spImg from "../assets/images/strong-pw.png";
import mfaImg from "../assets/images/mfa.jpeg";
import socialImg from "../assets/images/social-engineering.jpg";

function SATPPInfographics() {
  // Lessons grouped by category
  const lessons = {
    accessControl: [
      {
        id: 1,
        title: "Strong vs Weak Passwords",
        time: "1 MIN",
        description:
          "A weak password is short, predictable, and often uses common words or patterns (e.g., 123456, password, or birthdays), making it easy for attackers to guess or crack. A strong password, on the other hand, is long (at least 12+ characters), unique, and combines uppercase, lowercase, numbers, and symbols in a way that doesn’t follow obvious patterns. Strong passwords significantly reduce the risk of unauthorized access.",
        image: swImg,
      },
      {
        id: 2,
        title: "Access Control Policy Rules",
        time: "2 MIN",
        description:
          "Summarized Army IT access control policy: minimum privileges, user groups, and clearance levels.",
        image: wpImg,
      },
      {
        id: 3,
        title: "Incident Reporting Steps",
        time: "1 MIN",
        description:
          "Visual workflow on how to report access control or authentication-related incidents in the Army IT chain of command.",
        image:spImg
      },
    ],
    passwordSecurity: [
      {
        id: 4,
        title: "Steps to Enable MFA",
        time: "2 MIN",
        description:
          "Multi-Factor Authentication (MFA) adds an extra layer of protection by requiring more than just a password to log in. Enabling MFA typically involves registering your phone or email, installing an authenticator app, and linking it to your account. Once set up, you’ll enter your password first, followed by a one-time code or biometric verification. This makes it much harder for attackers to access accounts, even if your password is stolen.",
        image: mfaImg,
      },
      {
        id: 5,
        title: "Common Mistakes to Avoid",
        time: "1 MIN",
        description:
          "Highlights unsafe practices such as reusing passwords, writing them down, or sharing them with others.",
        image: swImg,
      },
      {
        id: 6,
        title: "Social Engineering Risks",
        time: "2 MIN",
        description:
          "Infographic explaining how attackers manipulate people to reveal credentials or bypass security.",
        image: socialImg,
      },
      {
        id: 7,
        title: "Do’s and Don’ts",
        time: "1 MIN",
        description:
          "Quick checklist of best practices for secure password usage and safe access management.",
        image: swImg,
      },
    ],
  };

  // Default active lesson (first in Access Control)
  const [activeLesson, setActiveLesson] = useState(lessons.accessControl[0]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left side: Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">
          Infographics – Access Control & Password Policy
        </h1>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            {activeLesson.title}
          </h2>
          <p className="text-gray-300 mb-4">{activeLesson.description}</p>
          <img
            src={activeLesson.image}
            alt={activeLesson.title}
            className="rounded-lg border border-gray-700 w-full"
          />
        </div>
      </div>

      {/* Right side: Lessons List */}
      <div className="w-80 bg-gray-900 p-6 border-l border-gray-700">
        <h2 className="text-xl font-bold text-purple-400 mb-6">
           Lessons
        </h2>

        {/* Access Control Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheckIcon className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-300">
              Access Control
            </h3>
          </div>
          <ul className="space-y-3">
            {lessons.accessControl.map((lesson) => (
              <li
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`cursor-pointer p-3 rounded-lg border ${
                  activeLesson.id === lesson.id
                    ? "bg-purple-800 border-purple-500"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-gray-400">{lesson.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Password Security Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <KeyIcon className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-300">
              Password Security
            </h3>
          </div>
          <ul className="space-y-3">
            {lessons.passwordSecurity.map((lesson) => (
              <li
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`cursor-pointer p-3 rounded-lg border ${
                  activeLesson.id === lesson.id
                    ? "bg-purple-800 border-purple-500"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-gray-400">{lesson.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SATPPInfographics;
