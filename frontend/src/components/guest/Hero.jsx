import React, { useState, useEffect } from 'react'
import { HiOutlineLightBulb, HiOutlineArrowRight } from "react-icons/hi"
import { Badge, InputText, Button } from '../ui'
import Swal from 'sweetalert2'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Hero = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [faqs, setFaqs] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article')
        const reversedArticles = response.data.data.reverse()
        setArticles(reversedArticles)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        setFaqs(response.data.data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchArticles()
    fetchFaqs()

    const interval = setInterval(() => {
      fetchArticles()
      fetchFaqs()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim()

    if (!searchQuery.trim()) {
      Swal.fire({
        icon: "warning",
        iconColor: "#ef4444",
        title: "Empty Search",
        text: "Please enter a search keyword first",
        confirmButtonText: "Got it",
        customClass: {
          title: "swal-title",
          text: "swal-text",
          popup: "swal-popup-sm",
          confirmButton: "swal-confirm",
        },
        showClass: {
          popup: 'swal-fade-in'
        },
        hideClass: {
          popup: 'swal-fade-out'
        },
      })
      return
    }

    const filteredFAQs = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    )

    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.body.toLowerCase().includes(query) ||
        article.tags.toLowerCase().includes(query)
    )

    if (filteredFAQs.length === 0 && filteredArticles.length === 0) {
      Swal.fire({
        icon: "warning",
        iconColor: "#ef4444",
        title: "No Results Found",
        text: "Try searching something else",
        confirmButtonText: "Got it",
        customClass: {
          title: "swal-title",
          text: "swal-text",
          popup: "swal-popup-sm",
          confirmButton: "swal-confirm",
        },
        showClass: {
          popup: 'swal-fade-in'
        },
        hideClass: {
          popup: 'swal-fade-out'
        },
      })
    } else {
      Swal.fire({
        title: 'Search Results',
        html: `
        <div class="space-y-2 text-left">
          ${filteredFAQs.length > 0 ? `<h5>FAQs <span class='text-neutral-500 font-normal text-lg'>(${filteredFAQs.length})</span></h5>
          <div class='grid grid-cols-2 gap-4'>
            ${filteredFAQs.map(faq => `
              <div class='border border-neutral-200/70 p-4 rounded-2xl space-y-3'>
                <span class='block text-2xl font-semibold text-left leading-6 text-neutral-900'>${faq.question}</span>
                <p>${faq.answer}</p>
              </div>
            `).join('')}
          </div>` : ''}
          ${filteredArticles.length > 0 ? `<h5 class='mt-6'>Articles <span class='text-neutral-500 font-normal text-lg'>(${filteredArticles.length})</span></h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            ${filteredArticles.map(article => `
              <a href="/article/${article._id}" class="p-2.5 border border-neutral-200/70 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg shadow-neutral-200/50">
                ${article.image ? `
                  <div class="border border-neutral-300 relative h-56 rounded-lg overflow-hidden">
                    <img src="${SERVER_URL}${article.image}" alt="${article.title}" class="absolute w-full h-full object-cover" />
                  </div>` : `
                  <div class="border border-neutral-300 relative h-56 rounded-lg overflow-hidden">
                    <img src="https://placehold.co/30x30" alt="Placeholder Image" class="absolute w-full h-full object-cover" />
                  </div>`}

                <div class="space-y-2.5 p-4">
                  <h4 class="break-all line-clamp-2 text-2xl font-medium">${article.title}</h4>
                  <p class="break-all line-clamp-4">${article.body}</p>
                  <div class="flex items-end justify-between gap-2 mt-6">
                    <p>${new Date(article.createdAt).toLocaleDateString('en-PH', {
          month: 'short', day: '2-digit', year: 'numeric'
        })}</p>
                    <div class="flex items-center gap-[1px]">
                      <p class="text-nowrap">Read More</p>
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-4.5 -rotate-45 stroke-[1.5px] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 7l-10 10m0 0h8m-8 0V9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            `).join('')}
          </div>` : ''}
        </div>
        `,
        customClass: {
          title: "swal-title",
          text: "swal-text",
          popup: "swal-popup-5xl",
          confirmButton: "swal-cancel",
        },
        showClass: {
          popup: 'swal-fade-in'
        },
        hideClass: {
          popup: 'swal-fade-out'
        },
        confirmButtonText: 'Close',
      }).then(() => {
        setSearchQuery('')
      })
    }
  }

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
            <label htmlFor="search">What do you want to know?</label>
            <div className='p-2 flex gap-2 border border-neutral-200 rounded-xl mt-2 shadow-lg shadow-neutral-300/20'>
              <InputText
                id="search"
                type="text"
                name="search"
                placeholder="E.g. What are the benefits of using React?"
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant='primary' onClick={handleSearch}>
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
        {[
          { title: 'Hello ward', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.' },
          { title: 'Hello ward', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.' },
          { title: 'Hello ward', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores harum.' },
        ].map((item, index) => (
          <div className='w-full max-w-xs' key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
