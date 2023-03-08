import React from 'react'
import { faArrowDownShortWide, faBars, faCircleChevronDown, faPlus, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileNavBar() {
    return (
    <div className='onTop'>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasResponsiveLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">
                    <p className=''>Explore</p>
                    {/* <FontAwesomeIcon className='title-icon' icon={faArrowDownShortWide} /> */}
                </h5>
                <button type="button" class="btn-close btn-sidebar " data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="dropdown mt-3">
                    <button class="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Categories</p>
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Memes</button></li>
                        <li><button class="dropdown-item">Lifestyle</button></li>
                        <li><button class="dropdown-item">Education</button></li>
                        <li><button class="dropdown-item">Gaming</button></li>
                        <li><button class="dropdown-item">Food</button></li>
                        <li><button class="dropdown-item">Business</button></li>
                    </ul>
                </div>
                <div class="dropdown mt-3">
                    <button class="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Groups</p>
                        <FontAwesomeIcon icon={faUsersLine} />
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Create <FontAwesomeIcon icon={faPlus} /></button></li>
                        <li><button class="dropdown-item">Explore</button></li>
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

