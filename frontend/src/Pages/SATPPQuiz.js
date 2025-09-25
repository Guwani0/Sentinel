import React, { useState } from "react";
import jsPDF from "jspdf";

function SATPPQuiz() {
  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "Which of the following is a strong password?",
      options: ["12345678", "P@ssword", "MyArmyIT2025!", "abcdef"],
      answer: "MyArmyIT2025!",
    },
    {
      id: 2,
      type: "mcq",
      question: "What does MFA stand for?",
      options: [
        "Multi-Factor Authentication",
        "Military Force Access",
        "Multiple File Authorization",
        "Mandatory Function Approval",
      ],
      answer: "Multi-Factor Authentication",
    },
    {
      id: 3,
      type: "short",
      question: "What is the minimum recommended length of a secure password?",
      answer: "12",
    },
    {
      id: 4,
      type: "mcq",
      question: "Which access control model is most used in military systems?",
      options: ["DAC", "RBAC", "MAC", "ABAC"],
      answer: "MAC",
    },
    {
      id: 5,
      type: "short",
      question: "Name one risk of reusing the same password across systems.",
      answer: "credential stuffing",
    },
    {
      id: 6,
      type: "mcq",
      question: "Which of these is an example of social engineering?",
      options: [
        "Phishing email",
        "Password complexity rules",
        "MFA prompt",
        "Firewall configuration",
      ],
      answer: "Phishing email",
    },
    {
      id: 7,
      type: "mcq",
      question: "Which password is more secure?",
      options: ["Army123", "Qwerty@123", "A!rT4nk$9xY!", "Password!"],
      answer: "A!rT4nk$9xY!",
    },
    {
      id: 8,
      type: "short",
      question: "What should you do if you suspect your account is compromised?",
      answer: "report",
    },
    {
      id: 9,
      type: "mcq",
      question: "Which is NOT a good password practice?",
      options: [
        "Change passwords regularly",
        "Use MFA",
        "Share with colleagues",
        "Use passphrases",
      ],
      answer: "Share with colleagues",
    },
    {
      id: 10,
      type: "simulation",
      question:
        "Imagine you receive a suspicious email asking you to reset your Army IT login. What should you do?",
      answer: "report phishing",
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQ]: value });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach((q, idx) => {
      const userAns = answers[idx]?.toString().toLowerCase().trim();
      const correctAns = q.answer.toString().toLowerCase().trim();
      if (userAns && userAns.includes(correctAns)) {
        total += 1;
      }
    });
    setScore((total / questions.length) * 100);
    setSubmitted(true);
  };

  // ✅ Certificate Generator
  const generateCertificate = () => {
  const doc = new jsPDF("landscape");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const purple = "#711bb5"; // Sentinel purple

  // Background (white, clean look)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top purple accent bar
  doc.setFillColor(purple);
  doc.rect(0, 0, pageWidth, 20, "F");

  // Certificate Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(purple);
  doc.text("Certificate of Completion", pageWidth / 2, 50, { align: "center" });

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("This certifies that", pageWidth / 2, 70, { align: "center" });

  // Recipient Name
  const userName = "Sergeant Fernando"; // 🔥 Updated Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(purple);
  doc.text(userName, pageWidth / 2, 90, { align: "center" });

  // Completion Text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    "has successfully completed the training module",
    pageWidth / 2,
    105,
    { align: "center" }
  );

  // Module Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(purple);
  doc.text("Access Control & Password Policy", pageWidth / 2, 120, {
    align: "center",
  });

  // Final Score
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Final Score: ${score}%`, pageWidth / 2, 135, { align: "center" });

  // Footer
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Sentinel Training Platform", 30, pageHeight - 20);
  doc.text(new Date().toLocaleDateString(), pageWidth - 30, pageHeight - 20, {
    align: "right",
  });

  // Save PDF
  doc.save("certificate.pdf");
};


  if (submitted) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">
          Quiz Completed
        </h1>

        <p className="text-gray-300 mb-6">
          You’ve completed the <span className="text-purple-300">Access Control & Password Policy</span> quiz. 
          Here’s your result:
        </p>

        {/* Score Circle */}
        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-purple-600 text-white text-2xl font-bold mb-6">
          {score}%
        </div>

        {/* Result Message */}
        {score >= 80 ? (
          <p className="text-green-400 font-semibold mb-6">
            Congratulations! You passed this training.
          </p>
        ) : (
          <p className="text-red-400 font-semibold mb-6">
            You did not reach 80%. Please retake the quiz.
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {score >= 80 ? (
            <>
              <button
                onClick={generateCertificate}
                className="px-6 py-2 bg-purple text-white rounded-lg hover:bg-[#6c009c]"
              >
                Download Certificate
              </button>
              <button
                onClick={() => window.location.href = "/satdashboard"}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Finish
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setCurrentQ(0);
                setScore(0);
              }}
              className="px-6 py-2 bg-purple text-white rounded-lg hover:bg-[#6c009c]"
            >
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-8">
      {/* Left side: Question area */}
      <div className="flex-1 bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-md">
        <h2 className="text-xl font-bold text-purple-300 mb-4">
          Question {currentQ + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-6">{q.question}</p>

        {/* Answer input */}
        {q.type === "mcq" && (
          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`block w-full text-left px-4 py-3 rounded border transition ${
                  answers[currentQ] === opt
                    ? "bg-purple-600 border-purple-500"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {q.type === "short" && (
          <input
            type="text"
            placeholder="Type your answer..."
            value={answers[currentQ] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        )}

        {q.type === "simulation" && (
          <textarea
            placeholder="Describe what you would do..."
            value={answers[currentQ] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white h-32"
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentQ === 0}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            ← Back
          </button>
          {currentQ < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-purple text-white rounded hover:bg-[#6c009c]"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* Right side: Progress + Info */}
      <div className="w-full md:w-64 bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-md">
        <h3 className="text-lg font-bold text-purple-400 mb-4">Progress</h3>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
                idx === currentQ
                  ? "bg-purple-500"
                  : answers[idx]
                  ? "bg-green-500"
                  : "bg-gray-700"
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-purple-400 mb-2">Quiz Info</h3>
        <p className="text-gray-300 text-sm mb-2">
          Questions: {questions.length} </p>
        <p className="text-gray-300 text-sm">Time Limit: No Time Limit</p>
        <p className="text-gray-300 text-sm">Attempts: Unlimited</p>
      </div>
    </div>
  );
}

export default SATPPQuiz;
