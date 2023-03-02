import React, { useState, useContext } from 'react'
import axios from 'axios'
import { SessionContext } from '../contexts/SessionContext'

function AddBio(props) {
    const {setBio, setEditBio, bio, setUsername, user } = props
    const { setUser } = useContext(SessionContext)


    const updateBio = async (e) => {
        e.preventDefault();
        const data = {username: user, bio: bio}
        const token = window.localStorage.getItem('token')
        const res = await axios.put('http://localhost:5005/auth/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.data.bio) {
            setBio(res.data.bio)
            setUser(res.data.username)
            setEditBio(false)
        }
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setEditBio(false);
    }

  return (
    <div className='modal-container'>
    <div className='modal-box'>
        <button className="close-modal" onClick={() => setEditBio(false)}>x</button>
        <form className='modal-content column-center' onSubmit={e => updateBio(e)}>
             <label htmlFor='username'>
                <p>Username: </p>
                <input type='text' name='username' value={user} onChange={e => setUser(e.target.value)} />
            </label>
            <label htmlFor='bio'>
                <p>Bio: </p>
                <textarea cols='35' rows='5' type='text' name='bio' value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </label>
            <div className='btn-container'>
                <button type='button' onClick={(e) => cancelEdit(e)}>Cancel</button>
                <button type='submit'>Update</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddBio