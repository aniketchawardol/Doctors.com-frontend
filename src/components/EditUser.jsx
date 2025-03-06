import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../fetchUserData";
import "../App.css";

const EditPatientForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    profilephoto: "",
    dob: "",
    bloodgroup: "",
    gender: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setFormData(data);
        setPreviewUrl(data.profilephoto);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilephoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-profile`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update patient: ${response.statusText}`);
      }
      setLoading(false);
      alert("Patient updated successfully!");
      navigate("/userpage");
    } catch (error) {
      setLoading(false);
      console.error("Error updating patient:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-white via-amber-100 to-teal-100">
        <div className="w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-teal-500 to-amber-100 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full" />
        </div>
      </div>
    );
  }

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="w-full flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Edit Patient Information</h1>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-400">Profile Photo</span>
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

        {/* Form Fields */}
        <div className="space-y-4">
          <InputField
            label="Full Name"
            name="fullname"
            type="text"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Phone Number"
            name="phonenumber"
            type="number"
            value={formData.phonenumber}
            onChange={handleChange}
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <SelectField
            label="Blood Group"
            name="bloodgroup"
            value={formData.bloodgroup}
            options={bloodGroups}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            options={["Male", "Female", "Other"]}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-teal-400 rounded-xl transition duration-200 ease-in-out hover:bg-teal-500 active:scale-95"
        >
          Update Patient Information
        </button>
      </form>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, name, type, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="textinput"
      required={required}
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="textinput">
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditPatientForm;
