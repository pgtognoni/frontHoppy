import React, { useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import { faArrowDownShortWide, faBars, faCircleChevronDown, faPlus, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionContext } from "../contexts/SessionContext";
import { PostContext } from "../contexts/PostContext";
import axios from "axios";
import CreateNewGroup from "./groups/CreateNewGroup";
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

function MobileNavBar({posts, setPosts, responseMessage, setResponseMessage}) {

    const { setUser, setFetchGroups, user, isAuthenticated, authenticated, background, setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply } =
    useContext(SessionContext);
  const { postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } =
    useContext(PostContext);

    const filterPosts = async (section) => {
        const response = await axios.get(`${VITE_BACK_URL}/filter/posts/${section}`);
        if(response.data.message) {
            setResponseMessage(response.data.message);
        } else {
            setPosts(response.data.posts);
            setResponseMessage('');
        }
    }

    return (
    <div className='onTop'>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasResponsiveLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
                    <p className=''>Explore</p>
                </h5>
                <button type="button" className="btn-close btn-sidebar " data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="dropdown mt-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Categories</p>
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                    </button>
                    <ul className="dropdown-menu" >
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('memes')}>Memes</button></li>
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('lifestyle')}>Lifestyle</button></li>
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('educational')}>Education</button></li>
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('gaming')}>Gaming</button></li>
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('food')}>Food</button></li>
                        <li><button data-bs-toggle="offcanvas" data-bs-target="#offcanvas" className="dropdown-item" onClick={e => filterPosts('business')}>Business</button></li>
                    </ul>
                </div>
                {responseMessage && <p style={{color: 'red'}}>{responseMessage}</p>}
                <div className="dropdown mt-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Groups</p>
                        <FontAwesomeIcon icon={faUsersLine} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><button type="button" className="btn btn-primary dropdown-item btn-reset-style" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="offcanvas">Create <FontAwesomeIcon icon={faPlus} /></button></li>
                        <li><Link to='/groups' className="dropdown-item" onClick={e => setFetchGroups(true)}>Explore</Link></li>
                    </ul>
                </div>
                <div className="dropdown mt-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Groups Joined</p>
                        <FontAwesomeIcon icon={faUsersLine} />
                    </button>
                    <ul className="dropdown-menu">
                    {user && user.groups.map(group => {
                        return (
                        <li><Link to={`/groups/${group._id}`} className="dropdown-item" >
                            {console.log(group._id)}
                            <div className="postContent">
                                <img className="postEmbed" src={group.image} alt="" />
                            </div>
                            <p className="group-title">{group.name}</p>
                        </Link></li>
                    )})}
                    </ul>
                </div>
            </div>
        </div>
        <CreateNewGroup />
    </div>
  )
}

export default MobileNavBar

