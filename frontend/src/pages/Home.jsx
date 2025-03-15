import React from 'react'
import { Link } from 'react-router-dom'
import { FAQs, Contact, Article } from '../components/guest'

const Home = () => {
  const token = localStorage.getItem('token')

  return (
    <>
      <div className='ml-64'>
        {token ? (
          <>
            <p>You are logged in as admin.</p>
            <Link to="/admin">Admin dasbord</Link>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <Article />
      <FAQs />
      <Contact />
    </>
  )
}

export default Home