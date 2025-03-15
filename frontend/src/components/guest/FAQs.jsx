import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import Swal from 'sweetalert2'

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])

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
      <div className='flex flex-col justify-between border rounded-2xl space-y-12 p-4'>
        <div className='space-y-3'>
          <h3>Lorem ipsum dolor sit, amet consectetur adipi.</h3>
          <a href='#contact' className='inline-flex'>
            <Button className=''>
              Get in touch
            </Button>
          </a>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus quidem optio labore magni eveniet repellat harum recusandae ut itaque, aliquam inventore eos officias.</p>
      </div>
      {/* Right Content */}
      <div className='border self-start'>
        <h1>GUEST: FAQs</h1>
        <ul className='divide-y'>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <h3>Question: {faq.question}</h3>
              <p>Answer: {faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FAQs
