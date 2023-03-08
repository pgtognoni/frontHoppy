import React from 'react'
import { Link } from 'react-router-dom';
import { faArrowDownShortWide, faBars, faCircleChevronDown, faPlus, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileNavBar() {
    return (
    <div className='onTop'>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasResponsiveLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
                    <p className=''>Explore</p>
                    {/* <FontAwesomeIcon className='title-icon' icon={faArrowDownShortWide} /> */}
                </h5>
                <button type="button" className="btn-close btn-sidebar " data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="dropdown mt-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Categories</p>
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">Memes</button></li>
                        <li><button className="dropdown-item">Lifestyle</button></li>
                        <li><button className="dropdown-item">Education</button></li>
                        <li><button className="dropdown-item">Gaming</button></li>
                        <li><button className="dropdown-item">Food</button></li>
                        <li><button className="dropdown-item">Business</button></li>
                    </ul>
                </div>
                <div className="dropdown mt-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Groups</p>
                        <FontAwesomeIcon icon={faUsersLine} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">Create <FontAwesomeIcon icon={faPlus} /></button></li>
                        <li><Link to='/groups' className="dropdown-item">Explore</Link></li>
                    </ul>
                </div>
            <div >
        </div>
            <div >
            </div>
        </div>
        </div>    
    </div>
  )
}

export default MobileNavBar

