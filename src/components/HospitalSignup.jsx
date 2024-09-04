import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css";
import { useRef } from 'react';
function HospitalSignup() {
  return (
    <>
<div className='flex bg-teal-100 justify-center h-full items-center animate-appear'>
<div className='flex flex-col items-center m-5'>
  <div className='border-2 rounded-3xl text-center bg-white drop-shadow-2xl'>
    <p className='mx-3 my-5 text-xl font-custom2'>Welcome to Doctors.com</p>
    <UploadButton label ="Upload Profile photo"/>
    <UploadButton label ="Upload other photos"/>
    <input type="text" placeholder='Enter Hospital/Lab name' className='textinput' />
    <textarea placeholder='Enter description' className='textinput' />
    <textarea placeholder='Enter location' className='textinput' />
    <input type="text" placeholder='Enter email' className='textinput' />
    <button className='buttons'>Send OTP </button>
    <input type="text" placeholder='Enter OTP for email' className='smalltextinput' />
    <button className='buttons'>Verify </button>
    <input type="number" placeholder='Enter helpline number 1' className='textinput' />
    <input type="number" placeholder='Enter helpline number 2' className='textinput' />
    <input type="number" placeholder='Enter helpline number 3' className='textinput' />
    <label htmlFor="open">Opening time</label>
    <input type="time" className='smalltextinput' id='open'/>
    <label htmlFor="close">Closing time</label>
    <input type="time" className='smalltextinput' id='close'/>
    <input type="password" placeholder='Enter password' className='textinput' />
    <input type="text" placeholder='REenter password' className='textinput' />
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
export default HospitalSignup
