import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'

function Navbar() {
    const { setIsLoading, setIsAuthenticated } = useContext(SessionContext)
    const navigate = useNavigate()
  
    const logout = () => {
      window.localStorage.clear()
      setIsAuthenticated(false)
      setIsLoading(true)
      navigate('/')
    }
  
  return (
    <div className='navBar'>
        <div className='logo-container'>
            <img src='../../public/image/hoppy_logo.png' className='nav-logo'/>
        </div>
        <div className='nav-links'>
            <NavLink to='/' className="text-white">Main</NavLink>
            <NavLink to='/store' className="text-white">Store</NavLink>
            <NavLink to='/profile' className="text-white">Profile</NavLink>
        </div>
        <div className='nav-logout'>
            <div className='nav-user'>
                <div className='profile-img'>
                    <img src='' className='profile-img'/>
                </div>
                <span>User Name</span>
            </div>
            <button className='nav-logout-btn' onClick={logout}>Logout</button>
            <NavLink to='/login' className="text-white">Login</NavLink>
            <NavLink to='/signup' className="text-white">Register</NavLink>
        </div>
    </div>
  )
}

export default Navbar