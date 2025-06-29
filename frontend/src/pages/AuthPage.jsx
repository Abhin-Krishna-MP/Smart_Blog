import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/axiosInstance'
import { toast } from 'react-toastify'
import { BlogContext } from '../context/BlogContext'

const AuthPage = () => {
  const { setIsAuthenticated } = useContext(BlogContext)
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const endpoint = isSignup ? '/signup/' : '/token/'
    const payload = { username, password }

    try {
      const res = await axios.post(endpoint, payload)
      const data = res.data
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      setIsAuthenticated(true)
      toast('Logged in successfully')
      navigate('/')
    } catch (error) {
      toast('Authentication failed. Check credentials.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <button className="auth-close" onClick={() => navigate(-1)}>×</button>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
          </form>
        )}

        {!loading && (
          <p onClick={() => setIsSignup(!isSignup)} className="switch-mode">
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </p>
        )}
      </div>
    </div>
  )
}

export default AuthPage
