import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import fetchUserData from "../fetchUserData.js";
import fetchHospitalData from "../fetchHospitalData.js";
import { Helmet } from "react-helmet-async";
import Poster from "../components/PosterPage.jsx";

function Home() {
  return <Navbar />;
}

function Navbar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ type: "none" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logoutUser = async () => {
    let route = user.type === "user" ? "users" : "hospitals";
    setLoading(true);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${route}/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
    console.log("User logged out successfully");
  };

  useEffect(() => {
    async function loadUserData() {
      const data = await fetchUserData();
      if (data) {
        setUser({ type: "user" });
        setLoading(false);
        return;
      }

      const hospitalData = await fetchHospitalData();
      if (hospitalData) {
        setUser({ type: "hospital" });
      } else {
        setUser({ type: "none" });
      }
    }
    loadUserData();
    setLoading(false);
  }, [loading]);

  if (loading)
    return (
      <>
        <Helmet>
          <title>Loading...</title>
          <meta
            name="description"
            content="Doctors.com simplifies patient report management and hospital search with secure, efficient healthcare solutions."
          />
          <link rel="canonical" href="/" />
        </Helmet>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-16 h-16 rounded-full animate-spin items-center bg-gradient-to-r from-teal-500 to-amber-100 justify-center">
            <div className="w-12 h-12 bg-white rounded-full "></div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Doctors.com</title>
        <meta
          name="description"
          content="Doctors.com simplifies patient report management and hospital search with secure, efficient healthcare solutions."
        />
        <link rel="canonical" href="" />
      </Helmet>
      <div className="flex sticky top-0 justify-center py-1 filter backdrop-blur-lg z-10">
        {/* Logo - visible on all screens */}
        <p className="text-black m-4 text-xl font-medium">
          Doctors<span className="text-2xl text-teal-300 font-bold">.</span>com
        </p>

        {/* Desktop navigation - unchanged from original */}
        <div className="hidden md:block">
          <div className="drop-shadow-xl mx-[9px] rounded-2xl bg-teal-200 m-2">
            <input
              type="search"
              placeholder="Search Hospitals/Laboratories"
              className="searchbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="mx-[9px] drop-shadow-xl rounded-2xl bg-teal-200 m-2">
            {user.type !== "none" ? (
              <>
                <Link
                  to={user.type === "user" ? "userpage" : "hospitalpage"}
                  className="buttons"
                >
                  Dashboard
                </Link>
                <button onClick={logoutUser} className="buttons">
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

        {/* Mobile menu button - only visible on mobile */}
        <button
          className="md:hidden p-2 m-4 rounded-md text-gray-700 hover:bg-teal-100"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu - only visible when toggled */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden`}
      >
          <div className="mx-auto drop-shadow-xl rounded-2xl w-fit bg-teal-200">
            <input
              type="search"
              placeholder="Search Hospitals/Laboratories"
              className="searchbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
          <div className="drop-shadow-xl rounded-2xl bg-teal-200 my-2 mx-auto w-fit">
            {user.type !== "none" ? (
              <>
                <Link
                  to={user.type === "user" ? "userpage" : "hospitalpage"}
                  className="buttons inline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logoutUser}
                  className="buttons inline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="login" className="buttons block w-full text-center">
                  Login
                </Link>
                <Link to="signup" className="buttons block w-full text-center">
                  Signup
                </Link>
              </>
            )}
          
        </div>
      </div>

      <List search={search} />
    </>
  );
}

function List({ search = "" }) {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchHospitals() {
      const route = search !== "" ? `search/${search}` : "all";
      if (search !== "") {
        try {
          const response = await fetch(
            ` ${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/hospitals/${route}?page=${page}&limit=${limit}`,
            { method: "GET" }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch hospitals: ${response.statusText}`
            );
          }
          const data = await response.json();
          setHospitals(data.data);
          setTotalPages(Math.ceil(data.totalCount / limit));
        } catch (err) {
          setError(err.message);
        }
      }
    }
    fetchHospitals();
    setLoading(false);
  }, [page, limit, search]);

  if (search === "") {
    return (
      <>
        <Poster />
      </>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex w-16 h-16 rounded-full animate-spin items-center bg-gradient-to-r from-teal-500 to-amber-100 justify-center">
          <div className="w-12 h-12 bg-white rounded-full "></div>
        </div>
      </div>
    );

  return (
    <div className="justify-center flex flex-col items-center w-full">
      <div className="flex flex-wrap justify-center">
        {hospitals.map((hospital) => (
          <Item key={hospital._id} hospital={hospital} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
            setLoading(true);
          }}
          className="buttons mx-2"
        >
          Previous
        </button>
        <span className="text-gray-700 mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages));
            setLoading(true);
          }}
          className="buttons mx-2"
        >
          Next
        </button>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setLoading(true);
          }}
          className="ml-4 p-2 rounded-md border border-gray-300"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

function Item({ hospital }) {
  return (
    <Link to={`hospital/${hospital._id}`}>
      <div className="transition duration-200 ease-in-out inline-block shadow-xl m-2 rounded-2xl bg-white hover:shadow-2xl hover:shadow-gray-600 active:shadow-sm">
        <img
          src={hospital.profilephoto}
          alt="Hospital"
          className="w-[200px] h-[150px] m-3 rounded-xl object-cover"
        />
        <p className="text-lg font-custom2 mx-4 font-semibold">
          {hospital.hospitalname}
        </p>
        <p className="text-left font-custom3 m-4">
          Timings: {hospital.openingtime} to {hospital.closingtime}
        </p>
        <p className="text-left font-custom3 m-4">
          Specializations: {hospital.specializations?.join(", ") || "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default Home;
