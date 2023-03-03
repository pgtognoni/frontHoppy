import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import { faUser, faRightFromBracket, faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
    const { setIsLoading, setIsAuthenticated, isAuthenticated, user, userImage } = useContext(SessionContext)
    const navigate = useNavigate()
    const location = useLocation().pathname
    console.log(location)

    const logout = () => {
      window.localStorage.clear()
      setIsAuthenticated(false)
      setIsLoading(true)
    }
  
  return (
    <div className='navBar'>
        <div className='logo-container'>
            <img src='../../public/image/hoppy_logo.png' className='nav-logo'/>
        </div>
            <div className='nav-links'>
            {location !== '/' && 
                <NavLink to='/' className="text-white">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
            }
            {isAuthenticated && 
                <>
                <NavLink to='/store' className="text-white">
                    <FontAwesomeIcon icon={faStore} />
                </NavLink>
                <NavLink to='/profile' className="text-white">
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
                </>
            }
            </div>
        <div className='nav-logout'>
        {isAuthenticated && 
            <div className='nav-user'>
                <>
                    {location === '/profile' 
                        ? null
                        : <><div className='nav-profile-img'>
                            <img src={userImage} className='profile-img'/>
                            </div>
                         <span className="text-white">{user}</span></>}
                </>
            <button className='text-white logout' onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
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