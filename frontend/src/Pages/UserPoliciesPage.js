import React, { useState, useEffect } from "react";
import Header from "../Components/Header";

function UserPoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [localAcknowledgments, setLocalAcknowledgments] = useState([]); // ✅ track locally
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const userId = "user123";
  const userName = "Test User";

  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, []);

  // ✅ Acknowledgment summary for sidebar
  const acknowledgedCount = localAcknowledgments.length;

  // ✅ Handle local acknowledgment
  const confirmAcknowledge = () => {
    if (!selectedPolicy || !confirmChecked) return;

    // add to local list
    setLocalAcknowledgments((prev) => [...prev, selectedPolicy._id]);

    // close modal
    setSelectedPolicy(null);
    setConfirmChecked(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      {/* Global Header */}
      <Header user={{ username: "User", role: "employee" }} /> <br />

      {/* Page Title */}
      <h2 className="text-4xl font-bold mb-2 text-purple-400 text-left">
        Assigned Policies
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-left mb-6">
        Please review the policies assigned to you and acknowledge once you have
        read them.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side → Policies List */}
        <div className="col-span-2 space-y-4">
          {policies.length === 0 && (
            <p className="text-gray-500 text-left mt-10">
              No policies available.
            </p>
          )}

          {policies.map((p) => {
            const fileUrl =
              p.fileUrl ||
              (p.fileName
                ? `http://localhost:5000/uploads/${p.fileName}`
                : null);

            const isAcknowledged = localAcknowledgments.includes(p._id);

            return (
              <div
                key={p._id}
                className="bg-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="block text-lg text-white">
                      {p.title}
                    </strong>
                    <span className="text-sm text-gray-400">
                      v{p.version || "1.0"} — {p.fileName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {fileUrl && (
                      <a
                        className="px-4 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium shadow transition"
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    )}
                    {isAcknowledged ? (
                      <span className="text-green-500 font-semibold">
                        Acknowledged
                      </span>
                    ) : (
                      <button
                        className="px-4 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium shadow transition"
                        onClick={() => setSelectedPolicy(p)}
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side → Sidebar */}
        <div className="col-span-1 space-y-4">
          {/* Progress Card */}
          <div className="bg-gray-900 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Acknowledgment Progress
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              You have acknowledged{" "}
              <span className="font-bold">{acknowledgedCount}</span> out of{" "}
              <span className="font-bold">{policies.length}</span> assigned
              policies.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full"
                style={{
                  width: `${
                    policies.length
                      ? (acknowledgedCount / policies.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gray-900 rounded-lg p-5 shadow-md">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              Policy Tips
            </h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>Always read the full document before acknowledging.</li>
              <li>Check version numbers for updated policies.</li>
              <li>Contact your supervisor if you have questions.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-400">
                Confirm Acknowledgment
              </h3>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              Do you want to acknowledge{" "}
              <span className="font-semibold">{selectedPolicy.title}</span>?
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm text-gray-300">
                I confirm I have read this policy.
              </label>
            </div>
            <button
              disabled={!confirmChecked}
              onClick={confirmAcknowledge}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                confirmChecked
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPoliciesPage;
