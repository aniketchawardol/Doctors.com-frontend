import React from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import "../App.css";
function PatientSignup() {
  return (
    <>
<div className='flex bg-teal-100 justify-center h-screen items-center animate-appear'>
<div className='flex flex-col items-center'>
  <div className='border-2 rounded-3xl text-center bg-white drop-shadow-2xl'>
    <p className='mx-3 my-5 text-xl font-custom2'>Welcome to Doctors.com</p>
    <UploadButton label ="Upload Profile photo"/>
    <input type="text" placeholder='Enter fullname' className='textinput' />
    <input type="text" placeholder='Enter email' className='textinput' />
    <button className='buttons'>Send OTP </button>
    <input type="text" placeholder='Enter OTP for email' className='smalltextinput' />
    <button className='buttons'>Verify </button>
    <input type="text" placeholder='Enter phone number' className='textinput' />
    <button className='buttons'>Send OTP </button>
    <input type="text" placeholder='Enter OTP for number' className='smalltextinput' />
    <button className='buttons'>Verify </button>
    <input type="password" placeholder='Enter password' className='textinput' />
    <input type="text" placeholder='REenter password' className='textinput' />
    <UploadButton label ="Upload previous reports"/>
    <button className='buttons'>Enter Doctors.com</button>
  </div>
  <Link to="/" className='buttons'>Homepage</Link>
</div>
</div>
    </>
  )
}
function UploadButton({label}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => console.log(e.target.files)}
      />
      <button className="buttons" onClick={handleButtonClick}>
        {label}
      </button>
    </div>
  );
}
export default PatientSignup
