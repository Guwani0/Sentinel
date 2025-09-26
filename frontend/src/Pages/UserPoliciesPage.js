import React, { useState, useEffect } from "react";

function UserPoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const userId = "user123"; // Replace with actual logged-in user
  const userName = "Test User";

  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, []);

  const handleAcknowledge = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/policies/${id}/acknowledge`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, name: userName }),
        }
      );

      const updatedPolicy = await res.json();
      setPolicies(
        policies.map((p) => (p._id === updatedPolicy._id ? updatedPolicy : p))
      );
    } catch (err) {
      console.error("Failed to acknowledge:", err);
    }
  };

  return (
    <div className="policies-page">
      <h2 className="page-title">Assigned Policies</h2>

      {policies.length === 0 && (
        <p className="empty-text">No policies available.</p>
      )}

      <div className="policies-card">
        <p className="intro-text">View and acknowledge policies assigned to you.</p>

        {policies.map((p) => (
          <div className="policy-item" key={p._id}>
            <div className="policy-info">
              <strong>{p.title}</strong>
              <span className="policy-meta">
                v{p.version || "1.0"} — {p.fileName}
              </span>
            </div>
            <div className="policy-actions">
              <a
                className="btn"
                href={`http://localhost:5000/uploads/${p.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
              {p.acknowledgments?.some((a) => a.userId === userId) ? (
                <span className="ack-badge">✅ Acknowledged</span>
              ) : (
                <button
                  className="btn"
                  onClick={() => handleAcknowledge(p._id)}
                >
                  Acknowledge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style>{`
        body {
          background-color: #0b0b0f;
          font-family: "Segoe UI", sans-serif;
          margin: 0;
          padding: 0;
        }

        .policies-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          min-height: 100vh;
          color: #fff;
        }

        .page-title {
          font-size: 2.2rem;
          color: #a855f7;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .empty-text {
          color: #aaa;
          margin-top: 40px;
          text-align: center;
        }

        .policies-card {
          background: linear-gradient(145deg, #2a003f, #110019);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.35);
          max-width: 750px;
          width: 100%;
          animation: fadeIn 0.6s ease-in-out;
        }

        .intro-text {
          margin-bottom: 20px;
          font-size: 1rem;
          color: #ccc;
        }

        .policy-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 18px 0;
        }

        .policy-item:last-child {
          border-bottom: none;
        }

        .policy-info strong {
          font-size: 1.1rem;
          color: #fff;
          display: block;
          margin-bottom: 4px;
        }

        .policy-meta {
          font-size: 0.9rem;
          color: #aaa;
        }

        .policy-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #a855f7, #6b21a8);
          color: #fff;
          font-weight: 500;
        }

        .btn:hover {
          opacity: 0.95;
          transform: scale(1.05);
        }

        .ack-badge {
          font-size: 0.95rem;
          color: #22c55e;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default UserPoliciesPage;
