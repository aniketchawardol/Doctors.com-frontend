import React, { useState } from "react";

const OtherPhotosField = ({ photos, fun, fun2 }) => {
  const [showDropbox, setShowDropbox] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setSelectedFiles(files);
  };

  const handlePhotoSelection = (photo) => {
    setSelectedPhotos((prev) =>
      prev.includes(photo) ? prev.filter((p) => p !== photo) : [...prev, photo]
    );
  };

  const handleSubmit = async () => {
    fun(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await fetch(
        ` /api/v1/hospitals/upload-photos`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        fun(false);
        alert("Photos uploaded successfully!");
        fun2();
        setSelectedFiles([]);
        setShowDropbox(false);
      } else {
        fun(false);
        alert("Failed to upload photos.");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      fun(false);
      alert("An error occurred while uploading.");
    }
  };

  const handleDelete = async () => {
    fun(true);
    try {
      const response = await fetch(
        ` /api/v1/hospitals/delete-photos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoUrls: selectedPhotos }),
          credentials: "include",
        }
      );

      if (response.ok) {
        fun(false);
        alert("Photos deleted successfully!");
        fun2();
        setSelectedPhotos([]);
      } else {
        fun(false);
        alert("Failed to delete photos.");
      }
    } catch (error) {
      console.error("Error deleting photos:", error);
      fun(false);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-2xl mb-4">
      <h3 className="text-xl font-semibold mb-3">Other Photos</h3>
      {photos.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {photos.map((photo) => (
            <li key={photo} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={photo}
                checked={selectedPhotos.includes(photo)}
                onChange={() => handlePhotoSelection(photo)}
              />
              <a href={photo} target="_blank" rel="noopener noreferrer">
              <img src={photo} className="h-[150px]" alt="Other" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No other photos available.</p>
      )}
      <div className="flex flex-col items-end gap-2 mt-4">
        <button
          className="buttons"
          onClick={() => setShowDropbox(!showDropbox)}
        >
          Add Photos
        </button>
        {photos.length > 0 && (
          <button
            className="buttons"
            onClick={handleDelete}
            disabled={selectedPhotos.length === 0}
          >
            Delete Selected Photos
          </button>
        )}
      </div>

      {showDropbox && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <label
            htmlFor="photo-upload"
            className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded"
          >
            Select Files
          </label>
          <input
            id="photo-upload"
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

export default OtherPhotosField;
