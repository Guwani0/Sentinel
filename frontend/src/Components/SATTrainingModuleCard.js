import React from "react";
import { useNavigate } from "react-router-dom";

function SATTrainingModuleCard({ module }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/satmodule"); // ✅ always go to the module page
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:border-purple-600 transition-all">
      <div
        className="h-32 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${module.image})` }}
      ></div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-purple-400">{module.title}</h3>
        <p className="text-sm text-gray-300 mt-1">{module.desc}</p>

        <button
          onClick={handleExplore}
          className="mt-4 px-4 py-2 bg-purple text-white text-sm rounded hover:bg-[#6c009c] transition-colors"
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default SATTrainingModuleCard;
