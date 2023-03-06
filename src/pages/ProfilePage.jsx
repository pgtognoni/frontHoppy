import React, { useState, useEffect, useContext, useRef } from 'react'
import AddBio from '../components/AddBio'
import LoginForm from '../components/LoginForm'
import PostForm from '../components/PostForm'
import { SessionContext } from '../contexts/SessionContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditImage from '../components/EditImage'
import ImageStore from '../components/ImageStore'
import PostCard from '../components/PostCard'


function ProfilePage() {

  const [ userProfile, setUserProfile ] = useState({})
  const [ profilePost, setProfilePost ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ editBio, setEditBio ] = useState(false)
  const [ editImage, setEditImage ] = useState(false)
  const [ imageStore, setImageStore ] = useState(false)
  const [ newImage, setNewImage ] = useState('')
  const [ bio, setBio ] = useState('')
  const ref = useRef();

  const { userImage, user } = useContext(SessionContext)

  
  useEffect(() => {

    const token = window.localStorage.getItem('token');

    const fetchAPI = async () => {
      const res = await fetch('http://localhost:5005/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        },
      })
      const json = await res.json()
      setUserProfile(json.user)
      setBio(json.user.bio)
      setProfilePost(json.user.published)
     }

     fetchAPI()

  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [ userProfile ])

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (editBio  && ref.current && !ref.current.contains(event.target)) {
        setEditBio(false)
      }
      if (editImage && ref.current && !ref.current.contains(event.target)) {
        setEditImage(false)
      }
      if (imageStore && ref.current && !ref.current.contains(event.target)) {
        setImageStore(false)
      }


    }
    const modal = document.querySelectorAll('.modal-container');
    modal.forEach(modal => {
      ref.current = modal;
    })
    document.addEventListener('click', checkClickedOutside)
    return () => {
      document.removeEventListener('click', checkClickedOutside)
    }
  }, [ editBio, editImage, imageStore ])

  const openEditInfo = (e) => {
    e.stopPropagation()
    setEditBio(true)
  }

  const openEditImage = (e) => { 
    e.stopPropagation()
    setEditImage(true)
  }

  const openImageStore = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setImageStore(true)
    setEditImage(false);
  }


  return (
    <>
    {isLoading 
      ? <h1>Loading...</h1>
      : <div className='profile-container' id='profile'>
      <div className='profile-header'>
        <div className='profile-image'>
          <img src={userImage[0]} alt='profile image' className='profile-img'/>
          <button onClick={(e) => openEditImage(e)} className='edit-btn edit-image'>
              <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {editImage && <EditImage setEditImage={setEditImage} openImageStore={openImageStore} setNewImage={setNewImage} newImage={newImage}/>}
          {imageStore && <ImageStore setNewImage={setNewImage} setImageStore={setImageStore} />}
        </div>
        <div className='profile-info'>
          <div className='profile-title'>
            <h1>{user.username}</h1>
            <button onClick={(e) => openEditInfo(e)} className='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          {bio ? <h5>{bio}</h5> : <h5 className='text-gray'>Add Bio</h5> }
          {editBio ? <AddBio 
            bio={bio} 
            setBio={setBio} 
            setEditBio={setEditBio} 
            /> : null}
        </div>
      </div>
      <div className='profile-body'>
        <div className='profile-posts'>
        {profilePost.map((post) => {
            return (
              <PostCard key={post._id} 
                post={post} 
                setProfilePost={setProfilePost} 
                allposts={profilePost}
                
              />
            );
          })}                      
        </div>
      </div>
    </div>
    }
  </>
  )
}

export default ProfilePage