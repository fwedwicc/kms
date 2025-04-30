import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineExclamationCircle } from "react-icons/hi"
import { InputText, Button, Spinner } from '../components/ui'
import { useNavigate, Navigate } from 'react-router-dom'
import api from '../utils/api.js'
import useScrollToTop from '../hooks/useScrollToTop'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Login = () => {
  useScrollToTop()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [companyInfo, setCompanyInfo] = useState(null)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await api.get('/company')
        setCompanyInfo(response.data.data)
      } catch (error) {
        console.error('Error fetching company info:', error)
      }
    }

    fetchCompanyInfo()
  }, [])

  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to="/admin" />
  }

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.token)

      navigate('/admin')
    } catch (error) {
      setError(error.response.data.message)
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
      className='flex justify-center lg:px-36 md:px-12 md:gap-8 gap-4 px-4 md:pt-48 pt-28 pb-20'
    >
      <div className='relative overflow-hidden grid lg:grid-cols-2 grid-cols-1 w-full max-w-6xl border border-neutral-300/60 p-1.5 rounded-4xl'>
        {/* Blur */}
        <div className='z-30 absolute -top-12 -left-12 bg-neutral-100 h-48 blur-2xl w-lg rounded-3xl' />
        {/* Background */}
        <img src="https://images.unsplash.com/photo-1729858445581-82386c16aaa8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample Background" className='z-20 absolute w-full h-full object-cover saturate-0 opacity-50' />
        {/* Company Details */}
        <div className='z-40 flex items-start gap-4 lg:h-auto h-48 p-4'>
          <div className='relative size-18 ring-2 ring-neutral-400 ring-offset-2 rounded-2xl overflow-hidden'>
            {companyInfo?.logo && !(companyInfo.logo instanceof File) && (
              <img
                src={`${SERVER_URL}${companyInfo.logo}`}
                alt={companyInfo?.name || 'Company Logo'}
                className="absolute w-full h-full object-cover"
              />
            )}
          </div>
          <div className='-space-y-1'>
            <h5>Welcome to {companyInfo?.name}!</h5>
            <p>Lorem ipsum, dolor sit amet consectetur.</p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className='z-40 bg-neutral-50 border border-neutral-300/60 rounded-3xl p-14 space-y-4'>
          <div className='flex flex-col justify-center items-center'>
            <h3>Welcome back :)</h3>
            <p>Login to proceed.</p>
          </div>
          {/* Username */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="username">Username</label>
            <InputText
              type="text"
              name='username'
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
          {/* Password */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="username">Password</label>
            <InputText
              name='password'
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {/* Terms Agreed */}
          <fieldset>
            <label className='flex items-center gap-2 leading-4'>
              <input
                type="checkbox"
                name="termsAgreed"
                // checked={formData.termsAgreed}
                onChange={handleChange}
              />
              Show password
            </label>
          </fieldset>
          {/* Error Message */}
          {error && (
            <motion.div
              className='flex items-center justify-center gap-1.5 rounded-md text-red-500'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineExclamationCircle className='size-4' />
              {error}
            </motion.div>
          )}
          {/* Login Button */}
          <Button type="submit" disabled={loading} variant='primary' className='w-full mt-6'>
            {loading ? 'Signing in' : <>Sign in <HiOutlineArrowRight className='size-4' /></>}
            {loading ? <Spinner /> : null}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default Login