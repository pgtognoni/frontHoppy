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
        const res = await axios.put(`${BACK_URL}/auth/profile`, data, {
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
    <div className="modal fade" id="editBio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">New Group</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className='' onSubmit={e => updateBio(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="col-form-label">Name:</label>
                <input type="text" className="form-control" id="name" name='username' value={user.username} onChange={(e) => {setUserName(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="bio" className="col-form-label" >Bio: </label>
                <textarea className="form-control" name='bio' maxLength={70} id="description" value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </div>
            <div className='error'>DELETE PROFILE</div>
            <div className="modal-footer btn-container">
                <button type="submit" className='btn-form save' data-bs-toggle="modal">UPDATE</button>
                <button type="button" className='btn-form cancel' data-bs-dismiss="modal">CANCEL</button>
            </div>
        </form>
        </div>
    </div>
    </div>
    </div>  
)
}

export default AddBio