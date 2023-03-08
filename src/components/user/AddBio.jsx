import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios'
import { SessionContext } from '../../contexts/SessionContext'

function AddBio(props) {
    const { setBio, setEditBio, bio } = props
    const { setUser, user } = useContext(SessionContext)

    const updateBio = async (e) => {
        e.preventDefault();
        const data = {bio: bio}
        const token = window.localStorage.getItem('token')
        const res = await axios.put('http://localhost:5005/auth/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.data.bio) {            
            setBio(res.data.bio)
            setUser(res.data)
            setEditBio(false)
            console.log("updated bio!", user.bio)
        }
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setEditBio(false);
    }

  return (
    <div className='modal-container'>
    <div className='modal-box dark-form' >
        <button className="close-modal" onClick={() => setEditBio(false)}>x</button>
        <form className='modal-content column-center' onSubmit={e => updateBio(e)}>
             <label htmlFor='username'>
                <p>Username: </p>
                <input type='text' name='username' value={user.username} />
            </label>
            <label htmlFor='bio'>
                <p>Bio: </p>
                <textarea cols='35' maxLength="70" rows='3' type='text' name='bio' value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </label>
            <div className='btn-container'>
                <button type='button' className='btn-form cancel' onClick={(e) => cancelEdit(e)}>Cancel</button>
                <button type='submit' className='btn-form save'>Update</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddBio