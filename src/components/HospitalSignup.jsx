import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function HospitalSignup() {
  const [formData, setFormData] = useState({
    hospitalname: "",
    email: "",
    password: "",
    helplinenumbers: [""],
    specializations: [""],
    openingtime: "",
    closingtime: "",
    description: "",
    location: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((value) => {
            if (value.trim()) submitFormData.append(key, value);
          });
        } else {
          submitFormData.append(key, formData[key]);
        }
      });

      if (profilePhoto) {
        submitFormData.append("profilephoto", profilePhoto);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/register`,
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
      alert("Hospital registered successfully!");
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      navigate("/");
    } catch (error) {
      console.error("Error registering hospital:", error);
      alert("Error registering hospital: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Hospital Signup page</title>
        <meta
          name="description"
          content="Sign up on Doctors.com to manage patient reports, receive submissions, and streamline hospital operations securely and efficiently."
        />
        <link rel="canonical" href="signup/hospitalsignup" />
      </Helmet>
      <div className="flex justify-center min-h-screen items-center animate-appear p-6">
        <form
          className="flex flex-col items-center border-2 rounded-3xl bg-white drop-shadow-2xl p-6 w-[32rem]"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-custom2 mb-4">
            Register Your Hospital on Doctors
            <span className="text-2xl text-teal-300 font-bold">.</span>com
          </p>

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
                  <span className="text-gray-400 text-sm">Hospital Logo</span>
                </div>
              )}
              <label className="buttons">
                Upload Logo
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
            name="hospitalname"
            placeholder="Hospital Name"
            className="textinput"
            value={formData.hospitalname}
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="textinput"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="textinput"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {formData.helplinenumbers.map((number, index) => (
            <div key={index} className="w-full">
              <input
                type="tel"
                placeholder={`Helpline Number ${index + 1}`}
                className="textinput"
                value={number}
                onChange={(e) =>
                  handleArrayInputChange(
                    index,
                    "helplinenumbers",
                    e.target.value
                  )
                }
                required={index === 0}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("helplinenumbers")}
            className="buttons mb-2"
          >
            Add Helpline Number
          </button>

          {formData.specializations.map((spec, index) => (
            <div key={index} className="w-full">
              <input
                type="text"
                placeholder={`Specialization ${index + 1}`}
                className="textinput"
                value={spec}
                onChange={(e) =>
                  handleArrayInputChange(
                    index,
                    "specializations",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("specializations")}
            className="buttons mb-2"
          >
            Add Specialization
          </button>

          <div className="flex w-full gap-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 w-[50%]">
              Opening Time
              <input
                type="time"
                name="openingtime"
                className="textinput mt-1"
                value={formData.openingtime}
                onChange={handleInputChange}
              />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700 w-[50%]">
              Closing Time
              <input
                type="time"
                name="closingtime"
                className="textinput mt-1"
                value={formData.closingtime}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <textarea
            name="description"
            placeholder="Hospital Description"
            className="textinput min-h-[100px]"
            value={formData.description}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="textinput"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="signupbuttons">
            Register Hospital
          </button>

          <Link
            to="/"
            className="bg-gray-500 text-white transition text-center font-custom2 ease-in-out w-full duration-200 hover:bg-teal-400 py-[6px] rounded-xl px-10 active:scale-95 block my-1"
          >
            Homepage
          </Link>
        </form>
      </div>
    </>
  );
}

export default HospitalSignup;
