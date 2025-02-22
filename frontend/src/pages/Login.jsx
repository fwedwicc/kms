import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
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
    <div>
      <Toaster position="bottom-right" reverseOrder={true} />
      <h1>Login Peyds to bhie</h1>
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
    </div>
  )
}

export default Login