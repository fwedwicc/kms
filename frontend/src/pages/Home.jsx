import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FAQs, Contact, Article, Hero, About } from '../components/guest'

const Home = () => {

  const token = localStorage.getItem('token')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Article />
      <FAQs />
      <Contact />
    </motion.div>
  )
}

export default Home