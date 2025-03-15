import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import Swal from 'sweetalert2'

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate pagination values
  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const indexOfLastFaq = currentPage * itemsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - itemsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  // Reset active index when changing pages
  useEffect(() => {
    setActiveIndex(0);
  }, [currentPage]);

  // Toggle accordion item
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Navigation functions
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
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
      <div className='border'>
        <h1>GUEST: FAQs</h1>
        <div className="mb-6">
          {currentFaqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 overflow-hidden"
            >
              {/* FAQ Question/Header */}
              <motion.button
                className="w-full py-4 px-6 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleAccordion(index)}
                initial={false}
              >
                <span className="font-medium text-gray-800 text-left">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >

                </motion.div>
              </motion.button>

              {/* FAQ Answer/Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="py-4 px-6 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Pagination - Back and Next buttons only */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 mb-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >

              Back
            </button>

            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
