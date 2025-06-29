import { createContext, useState, useEffect } from 'react'
import axios from '../services/axiosInstance'
import { decodeToken } from '../services/decodeToken'

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('blogs/')
      setBlogs(res.data)
    } catch (err) {
      console.error('Failed to load blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    const token = localStorage.getItem('access')
    setIsAuthenticated(!!token)

    try {
      const res = await axios.get('me/')
      setUser(res.data)
    } catch (err) {
      console.error('Failed to fetch user:', err)
    }
  }



  useEffect(() => {
    fetchBlogs()
    fetchUser()
  }, [])

  return (
    <BlogContext.Provider value={{isAuthenticated, setIsAuthenticated, blogs, setBlogs, setLoading, fetchBlogs, fetchUser, loading, user }}>
      {children}
    </BlogContext.Provider>
  )
}
