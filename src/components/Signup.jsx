import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css";
function Signup() {
  return (
    <>
<div className='flex bg-teal-100 justify-center h-screen items-center animate-appear'>
<div className='flex flex-col items-center'>
<Link to="/" className='buttons'>Back to Homepage</Link>
  <div className='border-2 rounded-3xl text-center bg-white drop-shadow-2xl '>
    <p className='mx-3 my-5 sm:float-start text-lg font-custom2'>Welcome to Doctors.com</p>
    <div className='inline-block mx-2 border-l-2 pl-2 my-4'>
   <Link to="patientsignup" className='signupbuttons'>New Patient</Link>
   <Link to="hospitalsignup" className='signupbuttons'>For Hospitals & Laboratories</Link>
   </div>
  </div>
</div>
</div>
    </>
  )
}

export default Signup
