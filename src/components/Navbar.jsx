import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
    const { setIsLoading, setIsAuthenticated, isAuthenticated, user, userImage } = useContext(SessionContext)
    const navigate = useNavigate()

    const logout = () => {
      window.localStorage.clear()
      setIsAuthenticated(false)
      setIsLoading(true)
      //navigate('/')
    }
  
  return (
    <div className='navBar'>
        <div className='logo-container'>
            <img src='../../public/image/hoppy_logo.png' className='nav-logo'/>
        </div>
        {isAuthenticated && 
            <div className='nav-links'>
                <NavLink to='/' className="text-white">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink to='/store' className="text-white">
                    <FontAwesomeIcon icon={faStore} />
                </NavLink>
                <NavLink to='/profile' className="text-white">
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
            </div>
        }
        <div className='nav-logout'>
        {isAuthenticated && 
            <div className='nav-user'>
                <div className='nav-profile-img'>
                    <img src={userImage} className='profile-img'/>
                </div>
                <span className="text-white">{user}</span>
            <button className='nav-logout-btn' onClick={logout}>Logout</button>
            </div>
        }
        {!isAuthenticated && 
            <div className='btn-container'>
                <NavLink to='/login' className="text-white">Login</NavLink>
                <NavLink to='/signup' className="text-white">Register</NavLink>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar