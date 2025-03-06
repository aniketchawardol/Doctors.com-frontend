import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUserData from "../fetchUserData.js";
import "../App.css";
import ReportsField from "./ReportsField.jsx";

function Userpage() {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [userdata, setUserdata] = useState({
    fullname: "Not Provided",
    email: "Not Provided",
    phonenumber: "Not Provided",
    profilephoto: null,
    dob: "Not Provided",
    bloodgroup: "Not Provided",
    gender: "Not Provided",
    hospitals: [],
    reports: [],
    hiddenreports: [],
  });

  useEffect(() => {
    async function loadUserData() {
      const data = await fetchUserData();
      setUserdata(data);
      setLoading(false);
    }
    loadUserData();
    setRefresh(false);
  }, [refresh]);

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
    <>
      <div className="w-full h-screen font-custom3 mx-auto p-6 animate-appear ">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        <div className="flex flex-col sm:flex-row w-full mb-4 rounded-2xl shadow-2xl">
          <div className="flex-shrink-0 m-2 ">
            {userdata.profilephoto ? (
              <img
                src={userdata.profilephoto}
                alt="Profile"
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
              <p className="text-lg inline font-semibold">Full Name: </p>
              <p className="text-md inline">{userdata.fullname}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Date of Birth: </p>
              <p className="text-md inline">{userdata.dob}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Email: </p>
              <p className="text-md inline">{userdata.email}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Phone Number: </p>
              <p className="text-md inline">{userdata.phonenumber}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Blood Group: </p>
              <p className="text-md inline">{userdata.bloodgroup}</p>
            </div>
            <div>
              <p className="text-lg inline font-semibold">Gender: </p>
              <p className="text-md inline">{userdata.gender}</p>
            </div>
          </div>
        </div>

        <ReportsField reports={userdata.reports} fun={setLoading} fun2={() => setRefresh(true)}/>
        <ReportsField reports={userdata.hiddenreports} name="Hidden" fun={setLoading} fun2={() => setRefresh(true)}/>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Associated Hospitals</h3>
          {userdata.hospitals.length > 0 ? (
            <ul className="list-none pl-6">
              {userdata.hospitals.map((hospital) => (
                <Link to={`hospital/${hospital._id}`} className="buttons"> 
                <li key={hospital._id} className="text-md">
                  {hospital.hospitalname}
                </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No associated hospitals.</p>
          )}
        </div>

        <div className="flex space-x-4">
          <Link to="/edituser" className="buttons">
            Edit Profile
          </Link>
          <Link to="/" className="buttons">
            Homepage
          </Link>
        </div>
        
      </div>
    </>
  );
}

export default Userpage;
