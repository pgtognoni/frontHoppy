import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

    const logout = () => { 

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
        </div>
    </div>
  )
}

export default Navbar