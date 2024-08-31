import React from 'react'
export default Home

import { useState } from "react";
import { Link } from 'react-router-dom'
import "../App.css";

function Home() {
  return (
    <>
      <div className='animate-appear'>
        <Navbar />
        <List />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <div className="flex sticky top-0 justify-center py-1 filter backdrop-blur-sm w-full">
      <p className="text-black m-4 text-xl  font-medium">
          Doctors<p className="inline text-teal-300 bold text-2xl">.</p>com
        </p>
      <div
        className=" drop-shadow-xl
         mx-[9px] rounded-2xl bg-teal-200 m-2"
      >

        <input
          type="search"
          placeholder="Search doctors/hospitals"
          className="searchbar"
        />
        <button className="buttons">Sort by</button>
        <Filter />
      </div>
      <div className="mx-[9px] drop-shadow-xl rounded-2xl bg-teal-200 m-2">
        <Link to="login" className="buttons">Login</Link>
        <Link to="signup" className="buttons">Signup</Link>
      </div>
    </div>
  );
}
function Approved() {
  let [approve, Setapprove] = useState(false);
  let tick = approve ? "✔" : "";
  let message = "Approved by Doctors.com " + tick;

  return (
    <button onClick={() => Setapprove(!approve)} className="mainlist">
      {message}
    </button>
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
        Filters
      </button>
      {active && (
        <ul
          className={`absolute p-1 bg-teal-200 rounded-xl top-[65px] w-[200px] left-[56%] ${anim}`}
        >
          <Approved />
          <ul>
            <li
              className="mainlist"
              onClick={() => {
                handleClick("location");
              }}
            >
              Location{" "}
            </li>
            <Location active={filters === "location"} />
            <li
              onClick={() => handleClick("specialities")}
              className="mainlist"
            >
              Specialties{" "}
            </li>
            <Specialties active={filters === "specialities"} />
            <li onClick={() => handleClick("insurance")} className="mainlist">
              Insurance Accepted
            </li>
            <InsuranceAccepted active={filters === "insurance"} />
            <li onClick={() => handleClick("services")} className="mainlist">
              Services Offered
            </li>
            <ServicesOffered active={filters === "services"} />
            <li onClick={() => handleClick("facilities")} className="mainlist">
              Facilities and Amenities
            </li>
            <FacilitiesAndAmenities active={filters === "facilities"} />
          </ul>
        </ul>
      )}
    </>
  );
}
function Location({ active }) {
  let [radio, Setradio] = useState("pin");

  return (
    <>
      {active && (
        <div className="text-sm text-teal-600 text-center">
          <p
            onClick={() => Setradio("state")}
            id="state"
            className="py-1 cursor-pointer"
          >
            State
          </p>
          {radio === "state" && (
            <input
              autoFocus
              type="text"
              placeholder="Enter State"
              className="filtersearchbar"
            />
          )}
          <p
            onClick={() => Setradio("city")}
            id="city"
            className="py-1 cursor-pointer"
          >
            City
          </p>
          {radio === "city" && (
            <input
              autoFocus
              type="text"
              placeholder="Enter City"
              className="filtersearchbar"
            />
          )}
          <p
            onClick={() => Setradio("pin")}
            id="pin"
            className="py-1 cursor-pointer"
          >
            Pincode
          </p>
          {radio === "pin" && (
            <input
              autoFocus
              type="number"
              placeholder="Enter Pincode"
              className="filtersearchbar"
            />
          )}
          <p className="py-1 cursor-pointer">Use GPS</p>
        </div>
      )}
    </>
  );
}
function ServicesOffered({ active }) {
  return (
    <div>
      {active && (
        <div className="text-left pl-4 text-sm text-teal-600">
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Emergency Room
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Intensive Care Unit (ICU)
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Maternity Services
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Outpatient Services
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Diagnostic Imaging
            (X-ray, MRI, CT Scan)
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Rehabilitation Services
          </label>
        </div>
      )}
    </div>
  );
}
function Specialties({ active }) {
  return (
    <div>
      {active && (
        <div className="text-left pl-4 text-sm text-teal-600 ">
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Cardiology
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Orthopedics
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Neurology
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Pediatrics
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Oncology
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> General Surgery
          </label>
        </div>
      )}
    </div>
  );
}
function FacilitiesAndAmenities({ active }) {
  return (
    <div>
      {active && (
        <div className="text-left pl-4 text-sm text-teal-600 ">
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Parking availability
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Cafeteria/food services
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Wi-Fi availability
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Private rooms
          </label>
        </div>
      )}
    </div>
  );
}
function InsuranceAccepted({ active }) {
  return (
    <div>
      {active && (
        <div className="text-left pl-4 text-sm text-teal-600">
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Navi Health Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> ManipalCigna Health
            Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Aditya Birla Health
            Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Star Health Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> Reliance Health Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> HDFC ERGO Health
            Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> ACKO Health Insurance
          </label>
          <label className="py-1 block">
            <input type="checkbox" className="mr-2" /> ICICI Lombard Health
            Insurance
          </label>
        </div>
      )}
    </div>
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
        className="w-[200px] h-[150px] m-3 rounded-3xl"
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
