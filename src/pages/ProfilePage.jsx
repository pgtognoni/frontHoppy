import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'

function ProfilePage() {

  const [ userPost, setUserPost ] = useState([])
  const [ userProfile, setUserProfile ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
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
      console.log('useEffect Json res: ', json.user)
      setUserProfile(json.user)
     }

     fetchAPI()

  }, [])

  useEffect(() => {
    setIsLoading(false)
    console.log(userProfile)
  }, [ userProfile ])

  
  return (
    <>
    {isLoading 
      ? <h1>Loading...</h1>
      : <div className='profile-cotainer'>
      <div className='profile-header'>
        <div className='profile-image'>
          <img src={userImage} alt='profile image' className='profile-img'/>
        </div>
        <div className='profile-info'>
          {/* <h1>{userProfile.username}</h1>
          <p>{userProfile.bio ? userProfile.bio : 'Add Bio' }</p> */}
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