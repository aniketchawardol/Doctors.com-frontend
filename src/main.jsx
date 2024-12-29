import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Loginpage from "./components/loginpage.jsx";
import Signup from "./components/Signup.jsx";
import PatientSignup from "./components/PatientSignup.jsx";
import HospitalSignup from "./components/HospitalSignup.jsx";
import Userpage from "./components/Userpage.jsx";
import EditUser from "./components/EditUser.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Loginpage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signup/patientsignup" element={<PatientSignup />} />
      <Route path="signup/hospitalsignup" element={<HospitalSignup />} />
      <Route path="userpage" element={<Userpage />}></Route>
      <Route path="edituser" element={<EditUser />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
