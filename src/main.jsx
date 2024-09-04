import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Loginpage from './components/loginpage.jsx'
import Signup from './components/Signup.jsx'
import PatientSignup from './components/PatientSignup.jsx'
const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Loginpage />} />
      <Route path='signup' element={<Signup />} />
      <Route path='signup/patientsignup' element={<PatientSignup />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>,
)
