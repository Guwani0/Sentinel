import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Search icon
import SATTrainingModuleCard from "../Components/SATTrainingModuleCard";
import passwordImg from "../assets/images/password-security.jpg";
import phishingImg from "../assets/images/phishing.jpg";
import deviceSecImg from "../assets/images/device-security.jpg";
import dataConfImg from "../assets/images/data-confidentiality.jpg";
import incidentReportImg from "../assets/images/incident-reporting.jpg";
import socialEngImg from "../assets/images/social-engineering.jpg";

const trainingModules = [
  {
    id: "1",
    title: "Access Control & Password Security",
    desc: "Secure accounts and mission systems with strong authentication.",
    image: passwordImg,
    date: "2025-01-15",
    status: "completed",
  },
  {
    id: "2",
    title: "Phishing & Malware Defense",
    desc: "Identify hostile cyber campaigns and defend against phishing attacks.",
    image: phishingImg,
    date: "2025-02-10",
    status: "inprogress",
  },
  {
    id: "3",
    title: "Military Network & Device Security",
    desc: "Protect field and HQ devices, VPNs, and secure communication channels.",
    image: deviceSecImg,
    date: "2025-02-20",
    status: "notstarted",
  },
  {
    id: "4",
    title: "Data Classification & Confidentiality",
    desc: "Handle Confidential, Secret, and Top Secret information correctly.",
    image: dataConfImg,
    date: "2025-03-01",
    status: "completed",
  },
  {
    id: "5",
    title: "Incident Reporting Protocols",
    desc: "Follow the chain of command to report cyber incidents.",
    image: incidentReportImg,
    date: "2025-03-10",
    status: "inprogress",
  },
  {
    id: "6",
    title: "Insider Threat & Social Engineering",
    desc: "Detect and prevent manipulation, infiltration, and insider risks.",
    image: socialEngImg,
    date: "2025-03-20",
    status: "notstarted",
  },
];

function SATDashboardPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  let filteredModules = trainingModules.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "completed") {
    filteredModules = filteredModules.filter((m) => m.status === "completed");
  } else if (filter === "inprogress") {
    filteredModules = filteredModules.filter((m) => m.status === "inprogress");
  } else if (filter === "notstarted") {
    filteredModules = filteredModules.filter((m) => m.status === "notstarted");
  }

  if (sort === "newest") {
    filteredModules.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "oldest") {
    filteredModules.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "az") {
    filteredModules.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "za") {
    filteredModules.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {/* Heading */}
      <br/> 
      <h1 className="text-5xl font-bold mb-6 text-purple-400 text-left">
        Training Portal
      </h1> <br/>

      {/* Search + Filter + Sort */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
        {/* Search bar with icon */}
        <div className="relative w-full md:w-1/3">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search training modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-purple-500 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Filter dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-purple-500 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="all">Show All Trainings</option>
          <option value="completed">Completed Trainings</option>
          <option value="inprogress">In-Progress Trainings</option>
          <option value="notstarted">Not Started Trainings</option>
        </select>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-purple-500 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>

      {/* Training module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredModules.map((module) => (
          <SATTrainingModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

export default SATDashboardPage;
