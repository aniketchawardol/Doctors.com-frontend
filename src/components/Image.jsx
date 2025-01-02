import React from 'react'
import { useParams } from 'react-router-dom'

function Image() {
  const { slug } = useParams();
  return (
    <div className='w-full h-full bg-black'>
      <img src={slug} className='h-screen' />
    </div>
  )
}

export default Image
