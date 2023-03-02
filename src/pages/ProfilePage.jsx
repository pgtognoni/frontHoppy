import React, { useState, useEffect } from 'react'

function ProfilePage() {

  const [ userPost, setUserPost ] = useState([])
  
  useEffect(() => {}, [userPost])

  return (
    <div className='profile-cotainer'>
      <div className='profile-header'>
        
      </div>
      <div className='profile-body'></div>
    </div>
  )
}

export default ProfilePage