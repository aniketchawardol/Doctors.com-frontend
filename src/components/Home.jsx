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
          placeholder="Search Hospitals/Laboratories"
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
