import React from 'react'
import { HiOutlineLightBulb, HiOutlineArrowRight } from "react-icons/hi"
import { Badge, Button } from '../ui'

const About = () => {

  // About Us
  const AboutUs = () => {
    return (
      <div className='flex flex-col items-center justify-center md:pt-30 pt-20 p-4 md:px-12 px-0 space-y-6'>
        <Badge variant='default' styles='mb-2'>
          <HiOutlineLightBulb className='size-4' />
          About us
        </Badge>
        <div className='flex flex-col items-center justify-center mt-4 gap-3'>
          <div className='relative size-40 rounded-3xl overflow-hidden shadow-2xl border border-white shadow-neutral-700/20'>
            <img src="https://placehold.co/30x30" alt="Company Logo" className='absolute w-full h-full object-cover' />    
          </div>
          <h1>StaySuite</h1>
        </div>
        <p className='w-full max-w-3xl text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus odio, nihil iure quas sapiente eos voluptate. Velit, eveniet veniam fugiat, facere architectconsectetur adipisicing elit. Suscipit et, doloribusat, facere architecto laboriosam blanditiis voluptatibus dolorum rem quidem nesciunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit et, doloribus offic officia facere asperiores dolorem architecto consectetur minus magnam eligendi veritatis, aperiam labore? Ipsum et, porro tempore assumenda illum recusandae!</p>
        {/* Illustration */}
        <div className='relative h-96 rounded-3xl w-full overflow-hidden mt-6'>
          <img src="https://placehold.co/30x30" alt="About Us Illustration" className='absolute w-full h-full object-cover' />
        </div>
      </div>
    )
  }

  // Our Services
  const OurServices = () => {
    return (
      <div className='border lg:px-36 md:px-12 gap-4 px-4 p-4 py-16'>
        <h2>Our Services</h2>
      </div>
    )
  }

  // Why Choose Us?
  const WhyChooseUs = () => {
    return (
      <div className='border lg:px-36 md:px-12 gap-4 px-4 p-4 py-16'>
        <h2>Why Choose Us?</h2>
      </div>
    )
  }

  return (
    <section id='about' className=''>
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
    </section>
  )
}

export default About
