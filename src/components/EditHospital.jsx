import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchHospitalData from "../fetchHospitalData";
import "../App.css";

const EditHospitalForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    hospitalname: "",
    email: "",
    helplinenumbers: [],
    specializations: [],
    openingtime: "",
    closingtime: "",
    description: "",
    location: "",
    profilephoto: "",
  });

  useEffect(() => {
    const loadHospitalData = async () => {
      try {
        const data = await fetchHospitalData();
        setFormData(data);
        setPreviewUrl(data.profilephoto);
      } catch (error) {
        console.error("Error loading hospital data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHospitalData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value, index) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleAddItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => {
      const updatedArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: updatedArray };
    });
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
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/update-profile`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update hospital: ${response.statusText}`);
      }
      setLoading(false);
      alert("Hospital updated successfully!");
      navigate("/hospitalpage");
    } catch (error) {
      setLoading(false);
      console.error("Error updating hospital:", error);
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

  return (
    <div className="w-full flex items-center justify-center p-6 bg-gradient-to-tr from-white via-amber-100 to-teal-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Edit Hospital Information</h1>

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
        <InputField
          label="Hospital Name"
          name="hospitalname"
          type="text"
          value={formData.hospitalname}
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
        <ArrayField
          label="Helpline Numbers"
          field="helplinenumbers"
          values={formData.helplinenumbers}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
          onChange={handleArrayChange}
        />
        <ArrayField
          label="Specializations"
          field="specializations"
          values={formData.specializations}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
          onChange={handleArrayChange}
        />
        <InputField
          label="Opening Time"
          name="openingtime"
          type="time"
          value={formData.openingtime}
          onChange={handleChange}
        />
        <InputField
          label="Closing Time"
          name="closingtime"
          type="time"
          value={formData.closingtime}
          onChange={handleChange}
        />
        <InputField
          label="Description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
        <InputField
          label="Location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-teal-400 rounded-xl transition duration-200 ease-in-out hover:bg-teal-500 active:scale-95"
        >
          Update Hospital Information
        </button>
      </form>
    </div>
  );
};

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

const ArrayField = ({ label, field, values, onAdd, onRemove, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    {values.map((value, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value, index)}
          className="textinput flex-1"
        />
        <button
          type="button"
          onClick={() => onRemove(field, index)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => onAdd(field)}
      className="text-teal-500 hover:underline"
    >
      Add {label}
    </button>
  </div>
);

export default EditHospitalForm;
