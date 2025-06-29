import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../../context/BlogContext'
import axios from '../../services/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProfilePage = () => {
  const { user, isAuthenticated, setIsAuthenticated, fetchUser } = useContext(BlogContext)
  const [blogCount, setBlogCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const navigate = useNavigate()

  const handleLogout = () => {
    toast("Logout successful")
    localStorage.clear()
    setIsAuthenticated(false)
    navigate('/')
  }

  useEffect(() => {
    fetchUser()
    async function fetchAuthorBlog() {
      const res = await axios.get('myblogs/')
      const data = res.data
      setBlogCount(data.length)
      setCommentCount(data.reduce((acc, blog) => acc + blog.comments.length, 0))
    }
    fetchAuthorBlog()
  }, [])

  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="profile-header">
        <div className="profile-avatar">{user?.username[0].toUpperCase()}</div>
        <h2>{user?.username}</h2>
      </div>
      <div className="profile-stats">
        <div>
          <h4>Total Blogs</h4>
          <p>{blogCount}</p>
        </div>
        <div>
          <h4>Total Comments</h4>
          <p>{commentCount}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </motion.div>
  )
}

export default ProfilePage
