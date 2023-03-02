import React, { useState, useEffect, useContext } from 'react'
import AddBio from '../components/AddBio'
import LoginForm from '../components/LoginForm'
import { SessionContext } from '../contexts/SessionContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {

  const [ username, setUsername ] = useState([])
  const [ userProfile, setUserProfile ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const [ editBio, setEditBio ] = useState(false)
  const [ bio, setBio ] = useState('')

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
    setEditBio(true)
  }
  return (
    <>
    {isLoading 
      ? <h1>Loading...</h1>
      : <div className='profile-container'>
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
            username={username}
            setUsername={setUsername}
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