import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import Swal from 'sweetalert2'

const Accordion = ({ title, isOpen, onClick, children }) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <button
        className={`w-full flex justify-between items-center px-4 py-3 text-gray-800 font-medium focus:outline-none ${isOpen ? 'bg-neutral-50' : ''}`}
        onClick={onClick}
      >
        <div className='flex items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${isOpen ? 'text-neutral-700' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span className={`md:text-base text-sm ${isOpen ? 'text-neutral-800' : 'text-neutral-700'}`}>{title}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 size-4 transition-opacity ${isOpen ? 'text-neutral-700' : 'text-neutral-400'}`}>
          {isOpen ? (
            <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          )}
        </svg>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-8 pt-4 pb-8 bg-neutral-50">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  // Get current items
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return faqs.slice(start, end);
  };

  // Navigation handlers
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    setOpenIndex(null); // Close any open accordion when changing page
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    setOpenIndex(null); // Close any open accordion when changing page
  };

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


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
    <div className='grid lg:grid-cols-2 grid-cols-1 border rounded-xl lg:px-36 md:px-12 gap-4 px-4 p-4 md:p-14'>
      {/* Left Content */}
      <div className='self-start flex flex-col justify-between border rounded-2xl space-y-36 p-4'>
        <div className='space-y-3'>
          <h3>Lorem ipsum dolor sit, amet consectetur adipi.</h3>
          <a href='#contact' className='inline-flex'>
            <Button>
              Get in touch
            </Button>
          </a>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus quidem optio labore magni eveniet repellat harum recusandae ut itaque, aliquam inventore eos officias.</p>
      </div>
      {/* Right Content */}
      <div className='border self-start'>
        <h1>GUEST: FAQs</h1>
        {/* <ul className='divide-y'>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <h3>Question: {faq.question}</h3>
              <p>Answer: {faq.answer}</p>
            </li>
          ))}
        </ul> */}
        <div className="divide-y">
          {getCurrentItems().map((faq, index) => (
            <Accordion
              key={faq._id}
              title={faq.question}
              isOpen={openIndex === index}
              onClick={() => handleAccordionClick(index)}
            >
              <div className='md:text-sm text-xs text-neutral-600'>
                {faq.answer}
              </div>
            </Accordion>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md transition-colors ${currentPage === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded-md transition-colors ${currentPage === totalPages - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
              Next
            </button>
          </div>
        )}


      </div>
    </div>
  )
}

export default FAQs
