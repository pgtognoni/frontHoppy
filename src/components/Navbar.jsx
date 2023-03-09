import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { useContext, useEffect } from "react";
import {
  faUser,
  faRightFromBracket,
  faHome,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { setIsLoading, setIsAuthenticated, isAuthenticated, user, userImage } =
    useContext(SessionContext);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const logout = () => {
    window.localStorage.clear();
    setIsAuthenticated(false);
    setIsLoading(true);
    navigate("/");
  };

  useEffect(() => {
    async function handleMenu() {
      const menu = document.querySelector(".body-menu")
      menu.style.display = "none"
    }    
    setTimeout(() => {
      handleMenu()
    }, 100)
  }, [])
  

  async function handleMenu() {
    const menu = await document.querySelector(".body-menu")
    console.log(menu.style.display)
    if (menu.style.display === "none") {
        menu.style.display = "flex"
    }
    else {
      menu.style.display = "none"      
    }
  }

  return (
    <div className="navBar">
      {/* <div className="logo-container">
        <img src="../image/hoppy_logo.png" className="nav-logo" />
      </div> */}
      <div className="nav-links">
        {!!isAuthenticated && (
          <>
            <NavLink to="/"  className={location === '/store' ? 'nav-link-inactive' : "text-white"}>
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <NavLink to="/store" className={location === '/' ? 'nav-link-inactive' : "text-white"}>
              <FontAwesomeIcon icon={faStore} />
            </NavLink>
          </>
        )}
      </div>
      <div className="nav-logout">
        {!!isAuthenticated && (
          <div className="nav-user">
            <>
              <div>
                <span className="currencyNav">{user ? `💎 ${user.currency}` : null}</span>
              </div>
              <button className="nav-profile-img btn-reset-style dropDownRelative" data-bs-toggle="dropdown">
                <img
                  src={userImage ? userImage[0] : null}
                  className="profile-img"
                />
              </button>
              
              <ul className="dropdown-menu nav-dropdown">
                <NavLink to="/profile" className="dropdown-item text-white">
                  Profile
                </NavLink>
                <li><button className="dropdown-item text-white logout" onClick={logout}>Log out</button></li>
              </ul>
              
            </>{" "}
          </div>
          
        )}
        {!isAuthenticated && (
          <div className="btn-container">
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
            <NavLink to="/signup" className="text-white">
              Register
            </NavLink>
          </div>
        )}
      </div>
      <div>
      {location === '/' || location === '/groups' ? 
      <button onClick={(e) => handleMenu()} className="burguerPop">🧭</button>
      :
      null
      }      
    </div>
    </div>
  );
}

export default Navbar;
