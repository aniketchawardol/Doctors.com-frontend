import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";

function PatientSignup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      // Create preview URL for the selected image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to send both text fields and file
      const submitFormData = new FormData();
      submitFormData.append("fullname", formData.fullname);
      submitFormData.append("email", formData.email);
      submitFormData.append("password", formData.password);
      if (profilePhoto) {
        submitFormData.append("profilephoto", profilePhoto);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
        {
          method: "POST",
          body: submitFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      console.log("User registered successfully:", data);
      alert("User registered successfully!");

      // Clean up the preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      navigate("/");

    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100 justify-center h-screen items-center animate-appear">
      <form
        className="flex flex-col items-center border-2 rounded-3xl bg-white drop-shadow-2xl p-6 w-96"
        onSubmit={handleSubmit}
      >
        <p className="text-xl font-custom2 mb-4">Welcome to Doctors<span className="text-2xl text-teal-300 font-bold">.</span>com</p>

        {/* Image upload section */}
        <div className="mb-4 w-full">
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <div className="mb-2 relative w-32 h-32">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="mb-2 w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">Profile Photo</span>
              </div>
            )}
            <label className="buttons">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <input
          type="text"
          name="fullname"
          placeholder="Enter full name"
          className="textinput"
          value={formData.fullname}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="textinput"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="textinput"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button
          type="submit"
          className="signupbuttons"
        >
          Register
        </button>

        <Link
          to="/"
          className="bg-gray-500 text-white transition text-center font-custom2 ease-in-out w-full 
    duration-200 hover:bg-teal-400 
      py-[6px] rounded-xl px-10 active:scale-95 block my-1 "
        >
          Homepage
        </Link>
      </form>
    </div>
  );
}

export default PatientSignup;
