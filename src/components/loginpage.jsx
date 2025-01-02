import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Loginpage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = formData.userType === "patient" ? "users" : "hospitals";
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/${endpoint}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "login failed");
      }

      const data = await response.json();
      alert(`${formData.userType === "patient" ? "User" : "Hospital"} logged in successfully!`);
      navigate("/");
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100 justify-center h-screen items-center animate-appear">
      <div className="flex flex-col items-center">
        <div className="border-2 rounded-3xl text-center bg-white drop-shadow-2xl w-[340px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center border-2 rounded-3xl bg-white drop-shadow-2xl p-6 w-96"
          >
            <p className="mx-3 my-5 text-xl font-custom2">Login</p>

            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="patient"
                  checked={formData.userType === "patient"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Patient
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="hospital"
                  checked={formData.userType === "hospital"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Hospital
              </label>
            </div>

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
              name="password"
              type="password"
              placeholder="Enter password"
              className="textinput"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="signupbuttons">
              Login
            </button>
            <Link
              to="/"
              className="bg-gray-500 text-white transition text-center font-custom2 ease-in-out w-full duration-200 hover:bg-teal-400 py-[6px] rounded-xl px-10 active:scale-95 block my-1"
            >
              Homepage
            </Link>
          </form>
          <a href="#" className="text-teal-500 absolute bottom-2 right-0">
            forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;