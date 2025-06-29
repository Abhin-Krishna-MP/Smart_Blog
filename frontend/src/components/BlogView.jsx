import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'
import { BlogContext } from '../context/BlogContext'
import axios from '../services/axiosInstance'
import ReactMarkdown from 'react-markdown'

const BlogView = () => {

    const { id } = useParams()
    const { blogs } = useContext(BlogContext)
    const blog = blogs.find(b => b.id === parseInt(id))

    const [commentText, setCommentText] = useState('')
    const [commentName, setCommentName] = useState('')
    const [comments, setComments] = useState(blog.comments || [])

    if (!blog) return <p>Blog not found.</p>

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/blogs/${blog.id}/comments/`, {
                name: commentName,
                text: commentText,
            })
            setComments(prev => [...prev, res.data])
            setCommentName('')
            setCommentText('')
        } catch (err) {
            console.error('Error posting comment', err)
        }
    }

    console.log(blog)

    return (
        <div className="blog-view">
            <h1 className='blog-title'>{blog.title}</h1>
            <div className="author-container">
                <p>Written by <strong>{blog.author}</strong></p>
            </div>
            <div className="blog-content">
                <ReactMarkdown>
                    {blog.content}
                </ReactMarkdown>
            </div>
            <div className="comment-section">
                <h2>Comments</h2>
                <div className="comment-list">

                    {
                        comments.length > 0 ?
                            (
                                comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <strong>{comment.name}</strong>
                                        <p>{comment.text}</p>
                                    </div>
                                ))
                            ) : <p>No comments yet. Be the first!</p>
                    }
                </div>
                <form onSubmit={handleSubmit} className='comment-form'>
                    <input type="text" placeholder='Your name' value={commentName} onChange={(e) => setCommentName(e.target.value)} required />
                    <textarea placeholder='Your comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
                    <button type='submit'>Post Comment</button>
                </form>
            </div>

        </div>
    )
}

export default BlogView
