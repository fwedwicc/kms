import React from 'react'
import { FAQs, Contact } from '../components/guest'

const Home = () => {
  const token = localStorage.getItem('token')

  return (
    <>
      <div>
        {token ? (
          <p>You are logged in as admin.</p>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <FAQs />
      <Contact />
    </>
  )
}

export default Home