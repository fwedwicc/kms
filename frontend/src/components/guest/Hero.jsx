import React from 'react'
import { HiOutlineLightBulb, HiOutlineArrowRight } from "react-icons/hi"
import { Badge, InputText, Button } from '../ui'

const Hero = () => {
  return (
    <section id='home' className='lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-30 pt-20'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
        {/* Hero Infos */}
        <div className='space-y-3'>
          <Badge variant='default' styles='mb-2'>
            <HiOutlineLightBulb className='size-4' />
            Wow ganern
          </Badge>
          {/* Heading and Subheadings */}
          <div className='space-y-1'>
            <h1>Seamless Stays,</h1>
            <h1>Exceptional Value:</h1>
            <h1>Book Yours Now.</h1>
          </div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint labore aliquam vitae dolorum nihil? Autem temporibus, ex minima commodi dolor harum esse tempore iusto distinctio debitis voluptatem! Alias, eligendi laborum?</p>
          {/* Search */}
          <fieldset className='mt-8'>
            <label htmlFor="firstName">What do you want to know?</label>
            <div className='p-2 flex gap-2 border border-neutral-200 rounded-xl mt-2 shadow-lg shadow-neutral-300/20'>
              <InputText
                type="text"
                name="firstName"
                placeholder="E.g. What are the benefits of using React?"
                className="w-full"
              />
              {/* value={formData.firstName}
              onChange={handleChange} */}
              <Button variant='primary'>
                {/* onClick={handleAddArticle} */}
                Search
                <HiOutlineLightBulb className='size-5 stroke-2' />
              </Button>
            </div>
          </fieldset>
          {/* Users kemerut */}
          <div className='flex items-center gap-3 mt-8'>
            <div className='flex items-center -space-x-[1px]'>
              {['https://github.com/themesberg/flowbite/blob/main/static/images/people/profile-picture-1.jpg?raw=true', 'https://github.com/themesberg/flowbite/blob/main/static/images/people/profile-picture-5.jpg?raw=true', 'https://github.com/themesberg/flowbite/blob/main/static/images/people/profile-picture-3.jpg?raw=true', 'https://github.com/themesberg/flowbite/blob/main/static/images/people/profile-picture-4.jpg?raw=true'].map((item, index) => (
                <span className='block relative overflow-hidden size-8 ring ring-offset-2 ring-neutral-500 rounded-full' key={index}>
                  <img src={item} alt="Placeholder Profile" className='absolute w-full h-full object-cover' />
                </span>
              ))}
            </div>
            <p>5000+ ipsum dolor sit amet</p>
          </div>
        </div>
        {/* Illustration */}
        <div className='lg:h-full h-96 border relative rounded-3xl overflow-hidden'>
          <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Illustration Image" className='-z-10 absolute w-full h-full object-cover' />
          <div className='-bottom-4 -left-4 blur-3xl w-[29rem] h-24 bg-neutral-950 absolute z-30'></div>
          <div className='absolute z-40 bottom-0 left-0 p-6'>
            <span className='md:text-3xl text-2xl font-bold text-neutral-100'>StaySuite</span>
            <span className='block w-full max-w-sm text-neutral-200 md:text-base text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint labore aliquam vitae dolorum</span>
          </div>
        </div>
      </div>
      {/* Numbers kempampamru */}
      <div className='flex flex-wrap lg:gap-20 md:gap-12 gap-12 items-center justify-center mt-20'>
        <div className='w-full max-w-xs'>
          <h3>Hello world</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.</p>
        </div>
        <div className='w-full max-w-xs'>
          <h3>Hello world</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.</p>
        </div>
        <div className='w-full max-w-xs'>
          <h3>Hello world</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.</p>
        </div>

      </div>
    </section>
  )
}

export default Hero
