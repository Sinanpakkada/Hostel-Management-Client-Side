import React from 'react'
import Features from '../Components/Features/Features'
import Hero from '../Components/Hero/Hero'
import './CSS/Home.css'
import NoticeBoard from '../Components/NoticeBoard/NoticeBoard'

const Home = () => {
  return (
    <div className='home'>
       <Hero/>
      <Features/>
      
      </div>
  )
}

export default Home
