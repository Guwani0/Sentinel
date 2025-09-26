import React, { useState, useEffect } from "react";

function PolicyManagementPage() {
  const [policies, setPolicies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Fetch policies from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, []);

  // Upload new policy
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdBy", "Admin");
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/policies", {
        method: "POST",
        body: formData,
      });
      const newPolicy = await res.json();

      // Ensure every uploaded policy has a fileUrl
      if (!newPolicy.fileUrl && newPolicy.fileName) {
        newPolicy.fileUrl = `http://localhost:5000/uploads/${newPolicy.fileName}`;
      }

      setPolicies([newPolicy, ...policies]);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error("Failed to upload policy:", err);
    }
  };

  return (
    <div className="App">
      <h2>📑 Policy Management</h2>

      {/* Upload Form */}
      <div className="pm-right">
        <h3>Upload New Policy</h3>
        <form onSubmit={handleUpload}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Policy Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Policy Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Choose File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="file-input"
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button type="submit">Upload Policy</button>
          </div>
        </form>
      </div>

      {/* Uploaded Policies Table */}
      <div className="pm-left" style={{ marginTop: "30px" }}>
        <h3>Uploaded Policies</h3>
        <div className="table-container">
          <table className="policy-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Version</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {policies.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "14px" }}>
                    No policies uploaded yet.
                  </td>
                </tr>
              )}
              {policies.map((p) => {
                // Construct fileUrl if not present
                const fileUrl =
                  p.fileUrl || (p.fileName ? `http://localhost:5000/uploads/${p.fileName}` : null);

                return (
                  <tr key={p._id}>
                    <td>{p.title}</td>
                    <td>{p.description}</td>
                    <td>{p.version || "1.0"}</td>
                    <td>Published</td>
                    <td>
                      {fileUrl ? (
                        <button type="button" onClick={() => window.open(fileUrl, "_blank")}>
                          View
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.85rem", color: "#bbb" }}>No file</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@500;700&display=swap');

        .App {
          min-height: 100vh;
          font-family: "Inter", sans-serif;
          background: #000;
          color: #e8e7ee;
          padding: 20px;
        }

        h2 { font-family: 'Poppins', sans-serif; margin-bottom: 20px; }
        h3 { font-family: 'Poppins', sans-serif; margin-bottom: 12px; }

        .pm-left, .pm-right {
          background: linear-gradient(145deg,#0f0812,#2b0036);
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 8px 36px rgba(0,0,0,0.6);
        }

        .table-container {
          overflow-x: auto;
          margin-top: 12px;
        }

        .policy-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
          overflow: hidden;
        }

        .policy-table th, .policy-table td {
          padding: 14px 16px;
          text-align: left;
        }

        .policy-table th {
          background: rgba(255,255,255,0.1);
          font-weight: 600;
        }

        .policy-table tr:nth-child(even) {
          background: rgba(255,255,255,0.04);
        }

        .policy-table tr:hover {
          background: rgba(255,255,255,0.08);
          transition: background 0.2s ease-in-out;
        }

        button {
          cursor: pointer;
          font-weight: 600;
          background-color: #711bb5;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          color: #fff;
          font-size: 0.85rem;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(113,27,181,0.6);
        }

        input[type="text"], .file-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          color: #fff;
        }

        .file-input::-webkit-file-upload-button {
          background-color: #711bb5;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default PolicyManagementPage;
