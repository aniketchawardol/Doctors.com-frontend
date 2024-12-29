import React, { useEffect } from "react";
export default Home;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import fetchUserData from "../fetchUserData.js";

function Home() {
  return (
    <>
      <div className="animate-appear bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100 ">
        <Navbar />
        <List />
      </div>
    </>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const logoutuser = async () => {
    await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log("User logged out successfully");
    navigate("/");
  };

  const [user, setUser] = useState({
    fullname: "Not Provided",
    email: "Not Provided",
    phonenumber: "Not Provided",
    profilephoto: null,
    dob: "Not Provided",
    bloodgroup: "Not Provided",
    gender: "Not Provided",
    hospitals: []
  });

  useEffect(() => {
    async function loadUserData() {
        const data = await fetchUserData();
        setUser(data);
        setLoading(false);
    }
    loadUserData();
  }, []);

  if(loading) return <div className="w-full h-screen bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100 flex items-center justify-center">
  <div className="flex w-16 h-16 rounded-full animate-spin items-center bg-gradient-to-r from-teal-500 to-amber-100 justify-center"><div className="w-12 h-12 bg-white rounded-full "></div></div>
 </div>

  return (
    <div className="flex sticky top-0 justify-center py-1 filter backdrop-blur-sm w-full">
      <p className="text-black m-4 text-xl font-medium">
        Doctors<span className="text-2xl text-teal-300 font-bold">.</span>com
      </p>
      <div className="drop-shadow-xl mx-[9px] rounded-2xl bg-teal-200 m-2">
        <input
          type="search"
          placeholder="Search Hospitals/Laboratories"
          className="searchbar"
        />
        <button className="buttons">Sort by</button>
        <Filter />
      </div>
      <div className="mx-[9px] drop-shadow-xl rounded-2xl bg-teal-200 m-2">
        {user ? (
          <>
            <Link to="userpage" className="buttons">
              Userpage
            </Link>
            <button onClick={logoutuser} className="buttons">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="login" className="buttons">
              Login
            </Link>
            <Link to="signup" className="buttons">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function Filter() {
  let [filters, Setfilters] = useState("none");

  let [active, setActive] = useState(false);

  function handleClick(name) {
    if (name === filters) {
      Setfilters("none");
    } else {
      Setfilters(name);
    }
  }
  let [anim, setanim] = useState("");
  return (
    <>
      <button
        onClick={() => {
          if (!active) {
            setActive(true);
            setanim("animate-appear");
          }
          if (active) {
            setanim("animate-disappear");
            setTimeout(function () {
              setActive(false);
            }, 150);
          }
          Setfilters("none");
        }}
        className="buttons"
      >
        Filter by Location
      </button>
      {active && (
        <ul
          className={`absolute  rounded-xl top-[65px] w-[200px] left-[56%] ${anim}`}
        >
          <Location />
        </ul>
      )}
    </>
  );
}
function Location() {
  return (
    <>
      <div className="text-sm text-teal-600 text-center">
        <textarea
          autoFocus
          placeholder="Enter location details"
          className="searchbar"
        />
      </div>
    </>
  );
}
function List() {
  return (
    <div className="justify-center flex w-full">
      <div className="flex flex-wrap justify-center">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
function Item() {
  return (
    <div className="transition duration-200 ease-in-out inline-block shadow-xl m-2 rounded-2xl bg-white hover:shadow-2xl hover:shadow-gray-600 active:shadow-sm">
      <img
        src=".\src\assets\download.jpg"
        alt="hospital image"
        className="w-[200px] h-[150px] m-3 rounded-xl"
      />
      <p className="text-lg font-custom2 mx-4 font-semibold">Gajanan Clinic</p>
      <p className="text-left font-custom3 m-4">
        timings 7:00 to 21:00
        <br />
        appointment within 2 days
      </p>
    </div>
  );
}
