import React from "react";

function SATPPSlides() {
  const slides = [
    {
      name: "Access Control Slides",
      embed:
        "https://docs.google.com/presentation/d/e/2PACX-1vRMeCk8KzknvEy0osQXAK7KTm3Dg8a4Ck9_X44pEdowRG2L-D7HB86xMOQ2Y1attQ/pubembed?start=false&loop=false&delayms=3000",
      download: "/slides/access.pptx", // replace with your Google Drive or hosted link
    },
    {
      name: "Password Security Slides",
      embed:
        "https://docs.google.com/presentation/d/e/2PACX-1vTpjOoUQt7qBrsWuHpGjBDdVhMYyaCXbVtZMj37kGiwjS-6S3LFhaADRCmEnYfdyg/pubembed?start=false&loop=false&delayms=3000",
      download: "/slides/password.pptx", // replace with real link
    },
    {
      name: "Overall Security Slides",
      embed:
        "https://docs.google.com/presentation/d/e/2PACX-1vSOMCxkHmYMSDqH5ND3JB5sKf6yJdh2N0w2A55yFYwYQGc4_f5HZy_SQhwGlJYKVA/pubembed?start=false&loop=false&delayms=3000",
      download: "/slides/security.pptx", // replace with real link
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        Training Slides – Access Control & Password Policy
      </h1>
      <p className="text-gray-300 mb-8 max-w-3xl">
        Preview and review the training slides below to reinforce your
        understanding of access control, password security, and overall
        information protection standards in the Army IT Department.
      </p>

      {/* Slides Preview Blocks */}
      <div className="space-y-12">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-md"
          >
            <h2 className="text-xl font-semibold text-purple-300 mb-4">
              {slide.name}
            </h2>

            {/* Embedded Google Slides */}
            <div className="w-full h-[500px] mb-4">
              <iframe
                src={slide.embed}
                className="w-full h-full rounded-lg border border-gray-700"
                frameBorder="0"
                allowFullScreen
                title={slide.name}
              ></iframe>
            </div>

            {/* Download Button */}
            <a
              href={slide.download}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-purple text-white rounded-lg hover:bg-[#6c009c] transition-colors"
            >
              Download {slide.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SATPPSlides;
