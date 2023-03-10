import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom';
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
  const { groupPostsCtx, setGroupPostsCtx, postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } =
    useContext(PostContext);

    const location = useLocation().pathname;


    const filterPosts = async (section) => {
        console.log(section)
        const response = await axios.get(`${VITE_BACK_URL}/filter/posts/${section}`);
        console.log(response.data)
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
                    Explore
                </h5>
                <button type="button" className="btn-close btn-sidebar " data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {location === '/'
                ? <>
                <div className="dropdown mt-2">
                    <button className="btn-sidebar btn-gray" type="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faArrowDownShortWide} className='purple-icon' />
                        <p className=''>Categories</p>
                    </button>
                    <ul className="dropdown-menu" >
                        <li><button className="dropdown-item" onClick={e => filterPosts('meme')}>Memes</button></li>
                        <li><button className="dropdown-item" onClick={e => filterPosts('lifestyle')}>Lifestyle</button></li>
                        <li><button className="dropdown-item" onClick={e => filterPosts('educational')}>Education</button></li>
                        <li><button className="dropdown-item" onClick={e => filterPosts('gaming')}>Gaming</button></li>
                        <li><button className="dropdown-item" onClick={e => filterPosts('food')}>Food</button></li>
                        <li><button className="dropdown-item" onClick={e => filterPosts('business')}>Business</button></li>
                    </ul>
                </div></>
                : null}
                <div className="dropdown mt-4">
                    <button className="btn-sidebar btn-gray" type="button" data-bs-toggle="dropdown">
                        <img className='group-icon' src='https://res.cloudinary.com/dgamncxcz/image/upload/v1678451023/group2_ajnq1j.svg' />
                        <p className=''>Groups</p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button type="button" className="dropdown-item btn-reset-style joined-li" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="offcanvas">Create <FontAwesomeIcon icon={faPlus} /></button></li>
                        <li><Link to='/groups' className="dropdown-item joined-li" onClick={e => setFetchGroups(true)}>Explore</Link></li>
                    </ul>
                </div>
                <div className="dropdown mt-4">
                    <button className="btn-sidebar btn-gray" type="button" data-bs-toggle="dropdown">
                        <img className='group-icon' src='https://res.cloudinary.com/dgamncxcz/image/upload/v1678451034/group1_lzdk5b.svg' />
                        <p className=''>Groups Joined</p>
                    </button>
                    <ul className="dropdown-menu">
                    {user && user.groups.map(group => {
                        return (
                        <li ><Link to={`/groups/${group._id}`} className="dropdown-item joined-li">
                            <div className="group-joined-img">
                                <img className="" src={group.image} alt="" />
                            </div>
                            <p className="nav-group-title">{group.name}</p>
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