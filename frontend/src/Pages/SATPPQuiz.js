import React, { useState } from "react";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

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

// ✅ Certificate Generator (White with Neon Purple Border + Gold Accents)
const generateCertificate = (userName, moduleName, score) => {
  const doc = new jsPDF("landscape", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  //const purple = "#711bb5"; // Sentinel Purple
  const neonLight = "#bb86fc"; // Light purple glow
  const gold = "#d4af37";   // Gold
  const black = "#000000";

  // ====== Neon Border Effect ======
  const borderThickness = 25;

  // Outer glow (lighter purple, semi-transparent)
  doc.setFillColor(neonLight);
  doc.setDrawColor(neonLight);
  doc.setGState(new doc.GState({ opacity: 0.3 }));
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Middle glow
  doc.setFillColor("#3a0044");
  doc.setDrawColor("#3a0044");
  doc.setGState(new doc.GState({ opacity: 0.6 }));
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "F");

  // Solid inner border
  doc.setFillColor("#3a0044");
  doc.setDrawColor("#3a0044");
  doc.setGState(new doc.GState({ opacity: 1 }));
  doc.rect(0, 0, pageWidth, pageHeight, "S");

  // ====== Inner White Rectangle (certificate area) ======
  doc.setFillColor(255, 255, 255);
  doc.rect(borderThickness, borderThickness, pageWidth - borderThickness * 2, pageHeight - borderThickness * 2, "F");

  // ====== Decorative Border Corners (Gold) ======
  doc.setDrawColor(gold);
  doc.setLineWidth(3);

  // Top-left
  doc.line(borderThickness + 20, borderThickness + 20, borderThickness + 80, borderThickness + 20);
  doc.line(borderThickness + 20, borderThickness + 20, borderThickness + 20, borderThickness + 80);

  // Top-right
  doc.line(pageWidth - borderThickness - 80, borderThickness + 20, pageWidth - borderThickness - 20, borderThickness + 20);
  doc.line(pageWidth - borderThickness - 20, borderThickness + 20, pageWidth - borderThickness - 20, borderThickness + 80);

  // Bottom-left
  doc.line(borderThickness + 20, pageHeight - borderThickness - 20, borderThickness + 80, pageHeight - borderThickness - 20);
  doc.line(borderThickness + 20, pageHeight - borderThickness - 20, borderThickness + 20, pageHeight - borderThickness - 80);

  // Bottom-right
  doc.line(pageWidth - borderThickness - 80, pageHeight - borderThickness - 20, pageWidth - borderThickness - 20, pageHeight - borderThickness - 20);
  doc.line(pageWidth - borderThickness - 20, pageHeight - borderThickness - 20, pageWidth - borderThickness - 20, pageHeight - borderThickness - 80);

  // ====== Title ======
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(gold);
  doc.text("CERTIFICATE OF PARTICIPATION", pageWidth / 2, 140, { align: "center" });

  // Divider
  doc.setDrawColor(black);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 100, 155, pageWidth / 2 + 100, 155);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("This is to certify that", pageWidth / 2, 190, { align: "center" });

  // Recipient Name
  doc.setFont("times", "italic");
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.text(String(userName), pageWidth / 2, 230, { align: "center" });

  // Description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(80, 80, 80);
  doc.text("has successfully completed the training module", pageWidth / 2, 260, { align: "center" });

  // Module Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(black);
  doc.text(String(moduleName), pageWidth / 2, 290, { align: "center" });

  // Score
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text(`Final Score: ${String(score)}%`, pageWidth / 2, 315, { align: "center" });

  // ====== Date + Signature ======
  const today = new Date().toLocaleDateString();
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  // Date
  doc.text("DATE", pageWidth / 4, pageHeight - 100, { align: "center" });
  doc.text(today, pageWidth / 4, pageHeight - 80, { align: "center" });

// "SIGNATURE" label
// Add logo
// (x, y, width, height)
doc.addImage(logo, "PNG", (3 * pageWidth) / 4 - 40, pageHeight - 172, 80, 72);

// Platform text below logo
doc.setFont("helvetica", "italic");
doc.setFontSize(12);
doc.setTextColor(0, 0, 0);
doc.text("Sentinel - SL Army IT Division", (3 * pageWidth) / 4, pageHeight - 80, { align: "center" });

  // Save
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
  onClick={() =>
    generateCertificate(
      "Sergeant Fernando", // or dynamic user from state
      "Access Control & Password Policy",
      score
    )
  }
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
