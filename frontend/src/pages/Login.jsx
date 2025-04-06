import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { InputText, Button } from '../components/ui'
import { useNavigate, Navigate } from 'react-router-dom'
import API from '../utils/api.js'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to="/admin" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await API.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.token)

      navigate('/admin')
    } catch (error) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='lg:px-36 md:px-12 md:gap-8 gap-4 px-4 pt-48 pb-36'
    >
      <h1>Login Peyds</h1>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className='text-red-500'>{error}</p>}
        <Button type='submit'>{loading ? 'Loading bhie...' : 'Login'}</Button>
      </form>
    </motion.div>
  )
}

export default Login