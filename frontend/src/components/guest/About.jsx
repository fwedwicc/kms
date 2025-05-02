import React from 'react'
import { HiOutlineLightBulb, HiOutlineLightningBolt, HiOutlineFire, HiOutlineHeart, HiOutlineSparkles, HiOutlineStar,  } from "react-icons/hi"
import { FaUtensils, FaHandSparkles } from "react-icons/fa6"
import { RiCustomerService2Fill } from "react-icons/ri"
import { FaSwimmingPool } from "react-icons/fa"
import { BiSolidParty } from "react-icons/bi"
import { MdHotel } from "react-icons/md"
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
      <div className='lg:px-36 md:px-12 gap-4 px-4 p-4 md:py-16 py-8'>
        <Badge variant='default' styles='mb-2'>
          <HiOutlineLightBulb className='size-4' />
          Wow ganern
        </Badge>
        <h2>Our Services</h2>
        <p className='w-full max-w-xl mt-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis omnis molestiae, fugiat dolore totam repudiandae culpa at veniam dol.</p>
        {/*  */}
        <div className='grid grid-cols-3 gap-4 mt-10 md:mx-14 mx-0'>
          {[
            {
              icon: MdHotel,
              title: 'Luxurious Rooms & Suites',
              description: 'Relax in comfort with our elegantly designed rooms, offering modern amenities, plush bedding, and breathtaking views.'
            },
            {
              icon: FaUtensils,
              title: 'Fine Dining & Cuisine',
              description: 'Indulge in a world of flavors at our on-site restaurant, featuring gourmet dishes crafted by expert chefs using fresh, local ingredients.'
            },
            {
              icon: FaHandSparkles,
              title: 'Spa & Wellness Retreat',
              description: 'Rejuvenate your body and mind with soothing massages, facials, and wellness treatments in our serene spa environment.'
            },
            {
              icon: FaSwimmingPool,
              title: 'Rooftop Pool & Lounge',
              description: 'Unwind by our rooftop infinity pool with panoramic city views, signature cocktails, and a laid-back, luxurious atmosphere.'
            },
            {
              icon: BiSolidParty,
              title: 'Business & Event Facilities',
              description: 'Host meetings or special events in our fully equipped conference rooms and elegant banquet halls, tailored to your needs.'
            },
            {
              icon: RiCustomerService2Fill,
              title: '24/7 Concierge & Services',
              description: 'Enjoy seamless stays with our round-the-clock concierge, offering personalized assistance, local recommendations, and more.'
            }
          ].map((item, index) => (
            <div className='border border-neutral-300/60 p-6 rounded-2xl' key={index}>
              <item.icon className='size-10 mb-2' />
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Why Choose Us?
  const WhyChooseUs = () => {
    return (
      <div className='lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-16 pt-8 grid md:grid-cols-2 grid-cols-1 gap-12'>
        <div>
          <Badge variant='default' styles='mb-2'>
            <HiOutlineLightBulb className='size-4' />
            Wow ganern
          </Badge>
          <h2>Why Choose Us?</h2>
          <h5>Why Choose Us?</h5>
          <p className='mt-8'>
            <h5 className='mb-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil sit repellendus eveniet nesciunt quia aliquam atque recusandae aspernatur rerum suscipit. Ab a optio — </h5>
            aliquam eum esse molestiae omnis odio.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil sit repellendus eveniet nesciunt quia aliquam atque recusandae aspernatur rerum suscipit. Ab a optio consequuntur, aliquam eum esse molestiae omnis odio.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil sit repellendus eveniet nesciunt quia aliquam atque recusandae aspernatur rerum suscipit. Ab a optio consequuntur, aliquam eum esse molestectetur adipisicing elit. Nihil sit repellendus eveniet nesciunt quia aliquam atque recusandae aspernatur rerum suscipitnis odio.</p>
        </div>
        <div className='flex flex-col gap-3'>
          {[
            {image: 'https://placehold.co/30x30', title: 'Hello World', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolor voluptatibus, culpa, nihil quibusdam incidunt ex unde sed repellendus eveniet.'},
            {image: 'https://placehold.co/30x30', title: 'Hello World', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolor voluptatibus, culpa, nihil quibusdam incidunt ex unde sed repellendus eveniet.'},
            {image: 'https://placehold.co/30x30', title: 'Hello World', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolor voluptatibus, culpa, nihil quibusdam incidunt ex unde sed repellendus eveniet.'},
          ].map((item, index) => (
            <div className='grid grid-cols-2 gap-4 p-2 rounded-3xl border border-neutral-300/60' key={index}>
              <div className='relative h-full w-full rounded-xl overflow-hidden'>
                <img src={item.image} alt="Image" className='w-full h-full object-cover absolute' />
              </div>
              <div className='p-3'>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
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
