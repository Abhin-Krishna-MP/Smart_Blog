import React, { useContext, useState } from 'react'
import axios from '../../services/axiosInstance'
import { BlogContext } from '../../context/BlogContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const AddBlogPage = () => {
  const { fetchBlogs } = useContext(BlogContext)
  const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [preview, setPreview] = useState(null)
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setThumbnail(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!title) return alert("Enter a title first")
    setLoading(true)
    try {
      const res = await axios.post('generate/', { title })
      setContent(res.data.content)
    } catch (err) {
      toast("Failed to generate content")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !category || !content) return alert("All fields except image are required")

    const formData = new FormData()
    formData.append('title', title)
    if (thumbnail) formData.append('thumbnail', thumbnail)
    formData.append('category', category)
    formData.append('content', content)

    try {
      await axios.post('blogs/', formData)
      toast("Blog posted successfully!")
      fetchBlogs()
      navigate('/')
    } catch (err) {
      toast("Failed to add blog")
      console.error(err)
    }
  }

  return (
    <motion.div
      className="add-blog-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2>Create a New Blog</h2>
      <form className="add-blog-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="fileUpload" className="file-upload-label">Choose Thumbnail</label>
        <input type="file" id="fileUpload" onChange={handleImageChange} className="custom-file-input" />
        {preview && <img src={preview} alt="Preview" className="thumbnail-preview" />}
        <select value={category} onChange={e => setCategory(e.target.value)} className="styled-select">
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="life">Life</option>
          <option value="edu">Edu</option>
          <option value="biz">Biz</option>
          <option value="art">Art</option>
        </select>
        <textarea
          placeholder="Content"
          rows="10"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <div className="form-buttons">
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Submit
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddBlogPage
