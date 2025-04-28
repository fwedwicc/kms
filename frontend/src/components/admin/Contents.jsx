import React from 'react'
import { motion } from 'framer-motion'

const Contents = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h5>Contents</h5>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </motion.div>
  )
}

export default Contents
