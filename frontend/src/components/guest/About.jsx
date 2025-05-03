import React, { useState, useEffect } from 'react'
import { HiOutlineLightBulb, HiOutlineLightningBolt, HiOutlineFire, HiOutlineHeart, HiOutlineSparkles, HiOutlineStar, } from "react-icons/hi"
import { FaUtensils, FaHandSparkles } from "react-icons/fa6"
import { RiCustomerService2Fill } from "react-icons/ri"
import { FaSwimmingPool } from "react-icons/fa"
import { BiSolidParty } from "react-icons/bi"
import { MdHotel } from "react-icons/md"
import { Badge, Button } from '../ui'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const About = () => {

  // About Us
  const AboutUs = () => {

    const [companyInfo, setCompanyInfo] = useState(null)
    const [aboutContent, setAboutContent] = useState(null)

    useEffect(() => {
      const fetchAboutContent = async () => {
        try {
          const response = await api.get('/about')
          setAboutContent(response.data.data)
        } catch (error) {
          console.error('Error fetching about info:', error)
        }
      }

      fetchAboutContent()
    }, [])

    useEffect(() => {
      const fetchCompanyInfo = async () => {
        try {
          const response = await api.get('/company')
          setCompanyInfo(response.data.data)
        } catch (error) {
          console.error('Error fetching company info:', error)
        }
      }

      fetchCompanyInfo()
    }, [])

    return (
      <div className='flex flex-col items-center justify-center md:pt-30 pt-20 p-4 md:px-12 px-0 space-y-6'>
        <Badge variant='default' styles='mb-2'>
          <HiOutlineLightBulb className='size-4' />
          About us
        </Badge>
        <div className='flex flex-col items-center justify-center mt-4 gap-3'>
          <div className='relative size-40 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-700/20'>
            {companyInfo?.logo && !(companyInfo.logo instanceof File) && (
              <img
                src={`${SERVER_URL}${companyInfo.logo}`}
                alt={companyInfo?.name || 'Company Logo'}
                className="-z-10 absolute w-full h-full object-cover"
              />
            )}
          </div>
          <h1>{companyInfo?.name}</h1>
        </div>
        <p className='w-full max-w-3xl text-center'>{aboutContent?.description}</p>
        {/* Illustration */}
        <div className='relative h-96 rounded-3xl w-full overflow-hidden mt-6'>
          {aboutContent?.illustration && !(aboutContent.illustration instanceof File) && (
            <img
              src={`${SERVER_URL}${aboutContent.illustration}`}
              alt={aboutContent?.name || 'About Illustration'}
              className="-z-10 absolute w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    )
  }

  // Our Services
  const OurServices = () => {

    const [ourServices, setOurServices] = useState(null)

    const serviceIcons = [
      MdHotel,
      FaUtensils,
      FaHandSparkles,
      FaSwimmingPool,
      BiSolidParty,
      RiCustomerService2Fill
    ]

    useEffect(() => {
      const fetchOurServicesContent = async () => {
        try {
          const response = await api.get('/about')
          setOurServices(response.data.data)
        } catch (error) {
          console.error('Error fetching about info:', error)
        }
      }

      fetchOurServicesContent()
    }, [])

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
          {ourServices?.services?.map((item, index) => {
            const Icon = serviceIcons[index] || HiOutlineLightBulb // fallback icon
            return (
              <div className='border border-neutral-300/60 p-6 rounded-2xl' key={index}>
                <Icon className='size-10 mb-2' />
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Why Choose Us?
  const WhyChooseUs = () => {

    const [whyUsContent, setWhyUsContent] = useState(null)

    useEffect(() => {
      const fetchWhyUsContent = async () => {
        try {
          const response = await api.get('/about')
          setWhyUsContent(response.data.data)
        } catch (error) {
          console.error('Error fetching about info:', error)
        }
      }

      fetchWhyUsContent()
    }, [])

    return (
      <div className='lg:px-36 md:px-12 px-4 p-4 md:pt-16 pt-8 grid md:grid-cols-2 grid-cols-1 gap-12'>
        <div>
          <Badge variant='default' styles='mb-2'>
            <HiOutlineLightBulb className='size-4' />
            Wow ganern
          </Badge>
          <h2>Why Choose Us?</h2>
          <h5>Why Choose Us?</h5>
          <p className='mt-8'>
            <h5 className='mb-4'>{whyUsContent?.highlightContent} — </h5>
            {whyUsContent?.content}</p>
        </div>
        <div className='flex flex-col gap-3'>
          {whyUsContent?.highlights?.map((item, index) => (
            <div className='flex gap-4 p-2 rounded-3xl border border-neutral-300/60' key={index}>
              <span className='text-neutral-900 font-bold text-8xl'>
                {String(index + 1).padStart(2, '0')}
              </span>
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
