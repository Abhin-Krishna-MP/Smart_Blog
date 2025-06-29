import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(true)
    const { isAuthenticated } = useContext(BlogContext)

    
    useEffect(() => {
      const token = localStorage.getItem('access')
      if(token){
        setShowLogin(false)
      }
    }, [])
    

    return (
        <div className='navbar'>
            <div className="navbar-container">
                <Link className='logo' to='/'>Smart Blog</Link>
                <div className="nav-links">
                    <Link to='/dashboard'>Dashboard</Link>
                    {!isAuthenticated && <Link to='/auth'>Login</Link>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
