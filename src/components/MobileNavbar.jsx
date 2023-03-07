import React from 'react'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileNavBar({ handleBackground }) {
    return (
        <div className='onTop'>
<button class="btn btn-primary open-sidebar add-new-post" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvasResponsive">
      <FontAwesomeIcon icon={faBars} />
</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasResponsiveLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
        <h1>WTF</h1>
        <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
        <button class="imageBackgrounChange1" 
            onClick={(e) => handleBackground(0)}
        ></button>
        <button class="imageBackgrounChange2" 
            onClick={(e) => handleBackground(1)}
        ></button>
    </div>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
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

