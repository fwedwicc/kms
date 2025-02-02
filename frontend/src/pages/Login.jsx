import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API from '../api.js'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);

      // Redirect to admin dashboard
      navigate('/admin')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login