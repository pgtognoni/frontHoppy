import React from 'react'
import HandleBackground from './HandleBackground'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BodyMenu(props) {

const { openModal } = props


  return (
    <div className='body-menu'>
        <div className='btn-menu-container'>
            <button class="open-sidebar add-new-post" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvasResponsive">
                <FontAwesomeIcon className='open-sidebar' icon={faBars} />
            </button>
        </div>
        <div className='btn-menu-container add-new-btn'>
            <button className="add-new-post" onClick={(e) => openModal(e)}>
                <span className="btn-add">➕</span>
                <p className='text-hide'>Add New Post</p>
            </button>
        </div>
        <HandleBackground />
    </div>
  )
}

export default BodyMenu