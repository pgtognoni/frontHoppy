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

    const logout = () => {
      window.localStorage.clear()
      setIsAuthenticated(false)
      setIsLoading(true)
      navigate('/')
    }
  
  return (
    <div className='navBar'>
        <div className='logo-container'>
            <img src='./image/hoppy_logo.png' className='nav-logo'/>
        </div>
            <div className='nav-links'>
            {location !== '/' && 
                <NavLink to='/' className="text-white">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
            }
            {isAuthenticated && 
                <>
                {location !== '/store' && 
                <NavLink to='/store' className="text-white">
                    <FontAwesomeIcon icon={faStore} />
                </NavLink>
                }
                {/* {location !== '/profile' && 
                <NavLink to='/profile' className="text-white">
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
                } */}
                </>
            }
            </div>
        <div className='nav-logout'>
        {isAuthenticated && 
            <div className='nav-user'>
                <>
                    {location === '/profile' 
                        ? null
                        : <NavLink to='/profile' className="text-white nav-user">
                            <div className='nav-profile-img'>
                                <img src={userImage[0]} className='profile-img'/>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", marginLeft: "-10px"}}>
                            <span style={{fontSize: "15px", fontWeight: "100"}} className="text-white">{user.username}</span>
                            <span>🪙{user.currency}</span>
                            </div>
                        </NavLink>
                        }
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