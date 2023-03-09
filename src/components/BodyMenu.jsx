import React, { useState } from 'react'
import HandleBackground from './HandleBackground'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
import PostForm from './posts/PostForm';
import MobileNavbar from './MobileNavbar';

function BodyMenu(props) {
    const [ responseMessage, setResponseMessage ] = useState("");
const { openModal, setPostsCall, posts, setPosts, setAddNewPost } = props
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
        <button type="button" class="add-new-post add-new-btn" data-bs-toggle="modal" data-bs-target="#createNewPost" >
                <span className="btn-add">➕</span>
                <p className='text-hide'>Add New Post</p>
            </button>
        </div>
        }
        <MobileNavbar post={posts} setPosts={setPosts} responseMessage={responseMessage} setResponseMessage={setResponseMessage} />
        <PostForm 
              setPostsCall={setPostsCall}
              posts={posts}
              setPosts={setPosts}
              setAddNewPost={setAddNewPost}/>
        <HandleBackground />
    </div>
  )
}

export default BodyMenu