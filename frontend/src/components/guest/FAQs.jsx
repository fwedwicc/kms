import React, { useEffect, useState } from 'react'

const FAQs = () => {

  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])

  useEffect(() => {
    // Function to fetch FAQs
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/faqs`)
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs')
        }
        const data = await response.json()

        // Check if new data is added
        if (lastFetchData.length > 0 && data.data.length > lastFetchData.length) {
          alert('New data added')
        }
        setLastFetchData(data.data)
        setFaqs(data.data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
  }, [lastFetchData])

  return (
    <div className='border rounded-xl p-4'>
      <h1>GUEST: FAQs</h1>
      <ul className='divide-y'>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <h2>Question: {faq.question}</h2>
            <p>Answer: {faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FAQs
