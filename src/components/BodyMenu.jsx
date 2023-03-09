import React from 'react'
import HandleBackground from './HandleBackground'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
import PostForm from './posts/PostForm';

function BodyMenu(props) {

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
        <button type="button" class="btn btn-primary dropdown-item btn-reset-style" data-bs-toggle="modal" data-bs-target="#createNewPost" >
                <span className="btn-add">➕</span>
                <p className='text-hide'>Add New Post</p>
            </button>
        </div>
        }
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