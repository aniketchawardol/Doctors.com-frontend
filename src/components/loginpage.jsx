import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css";

function Loginpage() {
  return (
    <>
<div className='flex bg-teal-100 justify-center h-screen items-center animate-appear'>
<div className='flex flex-col items-center'>
  <div className='border-2 rounded-3xl text-center bg-white drop-shadow-2xl w-[340px]'>
    <p className='mx-3 my-5 text-xl font-custom2'>Loginpage</p>
    <input type="text" placeholder='Enter email or phone number' className='textinput' />
    <input type="password" placeholder='Enter password' className='textinput' />
    <button className='buttons'>Login</button>
    <a href="#" className='text-teal-500 absolute bottom-2 right-2'>forgot password?</a>
  </div>
  <Link to="/" className='buttons'>Homepage</Link>
</div>
</div>
    </>
  )
}

export default Loginpage
