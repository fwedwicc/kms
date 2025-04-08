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
    // Function to fetch FAQs
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          Swal.fire({
            title: "New FAQ added!",
            text: "Check out the new FAQ added by the admin.",
            icon: "info",
            iconColor: "#f97316",
            confirmButtonText: "Sige bhie",
            customClass: {
              title: "swal-title",
              text: "swal-text",
              popup: "swal-popup",
              confirmButton: "swal-confirm"
            },
          })
        }
        setLastFetchData(newData)
        setFaqs(newData)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
  }, [lastFetchData])

  return (
    <section id='faqs' className='grid lg:grid-cols-2 grid-cols-1 lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-30 pt-20'>
      {/* Left Content */}
      <div className='flex flex-col justify-between border border-neutral-300 rounded-2xl md:space-y-36 space-y-12 p-4'>
        <div className='space-y-3'>
          <h3>Lorem ipsum dolor sit, amet consectetur adipi.</h3>
          <a href='#contact' className='inline-flex'>
            <Button variant='primary'>
              Get in touch
            </Button>
          </a>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus quidem optio labore magni eveniet repellat harum recusandae ut itaque, aliquam inventore eos officias.</p>
      </div>
      {/* Right Content */}
      <div>
        <h2>FAQs</h2>
        <span>Lorem ipsum dolor sit amet.</span>
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
