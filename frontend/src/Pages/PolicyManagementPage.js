import React, { useState, useEffect } from "react";
import Header from "../Components/Header"; 

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
    <div className="min-h-screen bg-black text-gray-200 p-6">
      <Header user={{ username: "Admin", role: "admin" }} /> <br />

      <h2 className="text-4xl font-bold mb-6 text-purple-400">Policy Management</h2>

      {/* Upload Form */}
      <div className="bg-gradient-to-b from-purple-950/95 to-purple-900/70 p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Upload New Policy</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              placeholder="Policy Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              placeholder="Policy Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Choose File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 transition shadow-md font-semibold"
            >
              Upload Policy
            </button>
          </div>
        </form>
      </div>

      {/* Uploaded Policies Table */}
      <div className="bg-gradient-to-b from-purple-950/95 to-purple-900/70 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Uploaded Policies</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-black/20 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-900/50 text-left">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Version</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {policies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No policies uploaded yet.
                  </td>
                </tr>
              )}
              {policies.map((p) => {
                const fileUrl =
                  p.fileUrl || (p.fileName ? `http://localhost:5000/uploads/${p.fileName}` : null);

                return (
                  <tr
                    key={p._id}
                    className="odd:bg-black/30 even:bg-black/20 hover:bg-purple-900/30 transition"
                  >
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2">{p.version || "1.0"}</td>
                    <td className="px-4 py-2">Published</td>
                    <td className="px-4 py-2">
                      {fileUrl ? (
                        <button
                          type="button"
                          onClick={() => window.open(fileUrl, "_blank")}
                          className="px-4 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium shadow"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">No file</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PolicyManagementPage;
