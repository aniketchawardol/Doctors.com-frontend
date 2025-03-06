import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import fetchUserData from "../fetchUserData.js";
import { Helmet } from "react-helmet-async";

function HospitalVisitorPage() {
  const { slug } = useParams();
  const [userdata, setUserdata] = useState({});

  const [loading, setLoading] = useState(true);
  const [hospitalData, setHospitalData] = useState({
    hospitalname: "Not Provided",
    email: "Not Provided",
    helplinenumbers: [],
    specializations: [],
    openingtime: "Not Provided",
    closingtime: "Not Provided",
    profilephoto: null,
    otherphotos: [],
    description: "Not Provided",
    location: "Not Provided",
  });

  const addPatient = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/add-patient`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ hospitalId: slug }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.message || "Error adding patient");
      return;
    }
    alert("Patient added successfully");
  };

  useEffect(() => {
    async function loadHospitalData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/hospitals/${slug}`,
        {
          method: "GET",
        }
      );
      const data1 = await response.json();
      const data = data1.data || {};
      setHospitalData(data);
    }
    async function loadUserData() {
      const data = await fetchUserData();
      setUserdata(data);
    }
    loadUserData();
    loadHospitalData();
    setLoading(false);
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-tr flex items-center justify-center">
        <div className="flex w-16 h-16 rounded-full animate-spin items-center bg-gradient-to-r from-teal-500 to-amber-100 justify-center">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{hospitalData.hospitalname}</title>
        <meta
          name="description"
          content={`${hospitalData.hospitalname} ${hospitalData.email} ${hospitalData.location} ${hospitalData.description}`}
        />
        <link rel="canonical" href={`hospitalpage/${slug}`} />
      </Helmet>
      <div className="w-full h-screen font-custom3 mx-auto p-6 animate-appear bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100">
        <h2 className="text-2xl font-bold text-center mb-6">
          {hospitalData.hospitalname}
        </h2>

        <div className="flex flex-col sm:flex-row w-full mb-4 rounded-2xl shadow-2xl">
          <div className="flex-shrink-0 m-2">
            {hospitalData.profilephoto ? (
              <img
                src={hospitalData.profilephoto}
                alt="Hospital Profile"
                className="w-32 h-32 m-2 shadow-xl rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 m-4 shadow-xl rounded-full bg-gray-300 flex items-center justify-center text-white">
                No Photo
              </div>
            )}
          </div>
          <div className="w-full shadow-2xl bg-white p-4 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-lg inline font-semibold">Email: </p>
              <p className="text-md inline">{hospitalData.email}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Location: </p>
              <p className="text-md inline">{hospitalData.location}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Opening Time: </p>
              <p className="text-md inline">{hospitalData.openingtime}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Closing Time: </p>
              <p className="text-md inline">{hospitalData.closingtime}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Helpline Numbers: </p>
              <ul className="text-md list-disc pl-4">
                {(hospitalData.helplinenumbers || []).map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Specializations</h3>
          {hospitalData.specializations &&
          hospitalData.specializations.length > 0 ? (
            <ul className="list-none pl-6">
              {hospitalData.specializations.map((specialization, index) => (
                <li key={index} className="text-md">
                  {specialization}
                </li>
              ))}
            </ul>
          ) : (
            <p>No specializations provided.</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p>{hospitalData.description}</p>
        </div>

        <ul className="flex flex-wrap gap-4">
          {hospitalData.otherphotos.map((photo) => (
            <li key={photo} className="flex items-center gap-3">
              <a href={photo} target="_blank" rel="noopener noreferrer">
                <img src={photo} className="h-[150px]" alt="Other" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex space-x-4">
          <Link to="/" className="buttons">
            Homepage
          </Link>
          {userdata && (
            <button
              className="transition bg-teal-500 font-custom2 ease-in-out inline-block
    duration-200 hover:bg-teal-400 text-white
      py-[6px] rounded-xl px-4 active:scale-90 my-2 mx-2"
              onClick={addPatient}
            >
              Submit your reports
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default HospitalVisitorPage;
