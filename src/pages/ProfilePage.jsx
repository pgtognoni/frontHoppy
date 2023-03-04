import React, { useState, useEffect, useContext, useRef } from 'react'
import AddBio from '../components/AddBio'
import LoginForm from '../components/LoginForm'
import { SessionContext } from '../contexts/SessionContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {

  const [ userProfile, setUserProfile ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const [ editBio, setEditBio ] = useState(false)
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
     }

     fetchAPI()

  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [ userProfile ])

  const openModal = (e) => {
    e.stopPropagation()
    setEditBio(true)
  }

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (editBio && ref.current && !ref.current.contains(event.target)) {
        console.log('clicked outside')
        setEditBio(false)
      }
    }
    const modal = document.querySelector('.modal-container');
    ref.current = modal;
    document.addEventListener('click', checkClickedOutside)
    return () => {
      document.removeEventListener('click', checkClickedOutside)
    }
  }, [ editBio ])


  return (
    <>
    {isLoading 
      ? <h1>Loading...</h1>
      : <div className='profile-container' id='profile'>
      <div className='profile-header'>
        <div className='profile-image'>
          <img src={userImage} alt='profile image' className='profile-img'/>
        </div>
        <div className='profile-info'>
          <div className='profile-title'>
            <h1>{user}</h1>
            <button onClick={(e) => openModal(e)} className='edit-btn'>
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
          HERE GOES THE CARD WITH THE USER POSTS
        </div>
      </div>
    </div>
    }
  </>
  )
}

export default ProfilePage