import React, { useState } from "react";
const ReportsField = ({ reports, name = "", fun, fun2 }) => {
  const [showDropbox, setShowDropbox] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setSelectedFiles(files);
  };

  const handleReportSelection = (report) => {
    setSelectedReports((prev) =>
      prev.includes(report)
        ? prev.filter((r) => r !== report)
        : [...prev, report]
    );
  };

  const route = name === "" ? "" : "hidden-";

  const handleSubmit = async () => {
    fun(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      if(name === "")
        formData.append("reports", file);
      if(name === "Hidden")
        formData.append("hiddenreports", file);
    });

    try {
      const response = await fetch(` /api/v1/users/upload-${route}reports`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        fun(false);
        alert("Reports uploaded successfully!");
        fun2();
        setSelectedFiles([]);
        setShowDropbox(false);
      } else {
        fun(false);
        alert("Failed to upload reports.");
      }
    } catch (error) {
      console.error("Error uploading reports:", error);
      fun(false);
      alert("An error occurred while uploading.");
    }
    
  };

  const handleDelete = async () => {
    fun(true);
    try {
      console.log(JSON.stringify({ reportUrls: selectedReports }));
      const response = await fetch(` /api/v1/users/delete-${route}reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportUrls: selectedReports }),
        credentials: "include",
      });
      if (response.ok) {
        fun(false);
        alert("Reports deleted successfully!");
        fun2();
        setSelectedReports([]);
      } else {
        fun(false);
        alert("Failed to delete reports.");
      }
    } catch (error) {
      fun(false);
      console.error("Error deleting reports:", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-2xl mb-4">
      <h3 className="text-xl font-semibold mb-3">{name} Reports</h3>
      {reports.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {reports.map((report) => (
            <li key={report} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={report}
                checked={selectedReports.includes(report)}
                onChange={() => handleReportSelection(report)}
              />
              <a href={report} target="_blank" rel="noopener noreferrer">
              <img src={report} className="h-[150px]"></img>
              </a>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available.</p>
      )}
      <div className="flex flex-col items-end gap-2 mt-4">
        <button
          className="buttons"
          onClick={() => setShowDropbox(!showDropbox)}
        >
          Add Reports
        </button>
        {reports.length > 0 && (
          <button
            className="buttons"
            onClick={handleDelete}
            disabled={selectedReports.length === 0}
          >
            Delete Selected Reports
          </button>
        )}
      </div>

      {showDropbox && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded"
          >
            Select Files
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <p>Selected Files:</p>
              <ul className="list-disc pl-6">
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="buttons mt-3"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportsField;
