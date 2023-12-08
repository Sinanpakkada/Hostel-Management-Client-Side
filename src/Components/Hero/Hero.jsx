import React from 'react'
import './Hero.css'
import front_image from '../Assets/Front_image.jpg'

const Hero = () => {
  return (
    <div className='hero'>
       <img src={front_image} alt="" />
       <p>Admin Portal</p>
             
       
    </div>
  )
}

export default Hero
