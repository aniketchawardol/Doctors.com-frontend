import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchHospitalData from "../fetchHospitalData.js";
import "../App.css";
import OtherPhotosField from "./Otherphotos.jsx";
import PatientList from "./PatientList.jsx";

function HospitalDashboard() {
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
    patients: [],
    location: "Not Provided",
  });

  useEffect(() => {
    async function loadHospitalData() {
      const data = await fetchHospitalData();
      setHospitalData(data);
      setLoading(false);
    }
    loadHospitalData();
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100 flex items-center justify-center">
        <div className="flex w-16 h-16 rounded-full animate-spin items-center bg-gradient-to-r from-teal-500 to-amber-100 justify-center">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full font-custom3 mx-auto p-6 animate-appear bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        Hospital Dashboard
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
            <p className="text-lg inline font-semibold">Hospital Name: </p>
            <p className="text-md inline">{hospitalData.hospitalname}</p>
          </div>
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
              {hospitalData.helplinenumbers.map((number, index) => (
                <li key={index}>{number}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Specializations</h3>
        {hospitalData.specializations.length > 0 ? (
          <ul className="list-disc pl-6">
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

      <OtherPhotosField
        photos={hospitalData.otherphotos}
        fun={setLoading}
        fun2={() => setLoading(true)}
      />

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Associated Patients</h3>
        {hospitalData.patients.length > 0 ? (
          <PatientList patients={hospitalData.patients} />
        ) : (
          <p>No associated patients.</p>
        )}
      </div>

      <div className="flex space-x-4">
        <Link to="/edithospital" className="buttons">
          Edit Hospital Profile
        </Link>
        <Link to="/" className="buttons">
          Homepage
        </Link>
      </div>
    </div>
  );
}

export default HospitalDashboard;
