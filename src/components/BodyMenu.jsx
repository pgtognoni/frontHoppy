import React from 'react'
import HandleBackground from './HandleBackground'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';

function BodyMenu(props) {

const { openModal } = props
const location = useLocation().pathname;

  return (
    <div className='body-menu'>
        <div className='btn-menu-container'>
            <button class="open-sidebar add-new-post" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvasResponsive">
                <FontAwesomeIcon className='open-sidebar' icon={faBars} />
            </button>
        </div>
        {location === '/' && 
        <div className='btn-menu-container add-new-btn'>
            <button className="add-new-post" onClick={(e) => openModal(e)}>
                <span className="btn-add">➕</span>
                <p className='text-hide'>Add New Post</p>
            </button>
        </div>
        }
        <HandleBackground />
    </div>
  )
}

export default BodyMenu