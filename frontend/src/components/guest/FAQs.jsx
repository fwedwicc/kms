import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { HiOutlineChevronDown } from "react-icons/hi"
import api from '../../utils/api'
import { Button } from '../ui'

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isChangingPage, setIsChangingPage] = useState(false)
  const itemsPerPage = 5

  // Calculate pagination values
  const totalPages = Math.ceil(faqs.length / itemsPerPage)
  const indexOfLastFaq = currentPage * itemsPerPage
  const indexOfFirstFaq = indexOfLastFaq - itemsPerPage
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq)

  // Reset active index when changing pages
  useEffect(() => {
    setActiveIndex(0)
  }, [currentPage])

  // Toggle accordion item
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Navigation functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setIsChangingPage(true)
      setCurrentPage(prev => prev - 1)
      setIsChangingPage(false)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setIsChangingPage(true)
      setCurrentPage(prev => prev + 1)
      setIsChangingPage(false)
    }
  }

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        setFaqs(response.data.data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
    const interval = setInterval(fetchFaqs, 5000)
    return () => clearInterval(interval)
  }, [faqs])

  return (
    <section id='faqs' className='grid lg:grid-cols-2 grid-cols-1 lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-30 pt-20'>
      {/* Left Content */}
      <div className='relative overflow-hidden flex flex-col justify-between border border-neutral-300 rounded-2xl md:space-y-36 space-y-12 p-6'>
        <div className='-top-4 -left-4 blur-3xl w-[35rem] h-56 bg-neutral-950/80 absolute z-30'></div>
        <img src="https://images.unsplash.com/photo-1611892441796-ae6af0ec2cc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='top-0 left-0 absolute w-full h-full object-cover' />
        <div className='z-40 space-y-2'>
          <span className='block mb-2 text-4xl text-neutral-200 font-semibold'>StaySuite at Your Service</span>
          <span className='block w-full max-w-lg text-neutral-300'>Experience seamless support and answers to all your inquiries. Our team is here to help ensure your stay—and your access to information—is effortless and satisfying.</span>
          <a href='#contact' className='inline-flex mt-3'>
            <Button variant='primary'>
              Get in touch
            </Button>
          </a>
        </div>
      </div>
      {/* Right Content */}
      <div>
        <h2>FAQs</h2>
        <span>Find quick answers to common questions.</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="my-5"
          >
            {currentFaqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                {/* FAQ Question/Header */}
                <motion.button
                  className={`w-full md:py-3 py-2 md:px-5 px-4 rounded-t-2xl flex justify-between items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out border-neutral-200 ${activeIndex === index ? 'border border-b-0 bg-neutral-50/30' : ''}`}
                  onClick={() => toggleAccordion(index)}
                  initial={false}
                >
                  <span className='text-lg font-medium text-left leading-6'>{faq.question}</span>
                  <HiOutlineChevronDown className={`size-5 stroke-[1.4px] flex-shrink-0 transition-all duration-300 ease-in-out ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`} />
                </motion.button>
                {/* FAQ Answer/Content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 md:pb-4 pb-3 md:px-5 px-4 rounded-b-2xl border border-t-0 border-neutral-200 bg-neutral-50/30 transition-all duration-300 ease-in-out">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {/* Pagination - Back and Next buttons only */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 mb-4">
            <Button variant='secondary' onClick={goToPreviousPage} disabled={currentPage === 1 || isChangingPage}>
              Back
            </Button>
            <span className='text-sm'>Page {currentPage} of {totalPages}</span>
            <Button variant='secondary' onClick={goToNextPage} disabled={currentPage === totalPages || isChangingPage}>
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQs
