import React, { useEffect, useState } from 'react'

const Home = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/faqs`)
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs')
        }
        const data = await response.json()
        setFaqs(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqs()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Those FAQs should be in here</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home