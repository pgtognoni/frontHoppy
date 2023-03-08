import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios'
import { SessionContext } from '../../contexts/SessionContext'
import { faCamera, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditImage(props) {

    const {setEditImage, openImageStore, setNewImage, newImage } = props
    const { setUserImage, userImage } = useContext(SessionContext)

    //const { setUser, user } = useContext(SessionContext)

    const updateImage = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token')
        const newArr = [...userImage];
        let data = {}
        if (newArr.includes(newImage)) { 
            newArr.map((item, index) => {

                if (item === newImage) {
                    [newArr[index], newArr[0]] = [newArr[0], newArr[index]]
                }
            })
        } else {
            newArr.shift(newImage)
        }
        data = {image: newArr}
        const res = await axios.put('http://localhost:5005/auth/profile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.data.image) {
            const imgArr = document.querySelectorAll('img.profile-img')
            imgArr.forEach((item) => {
                    item.classList.remove('inactive')
            })
            setUserImage(res.data.image)
            setEditImage(false);
        }
    }

    const selectImage = (image) => {
        const imgArr = document.querySelectorAll('img.profile-img')
        imgArr.forEach((item, index) => {
            if (item.classList.contains('inactive')) {
                item.classList.remove('inactive')
            } else {
                item.classList.add('inactive')
            }
        })
        setNewImage(image)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        const imgArr = document.querySelectorAll('img.profile-img')
        imgArr.forEach((item) => {
                item.classList.remove('inactive')
        })
        setEditImage(false);
    }

  return (
    <div className='modal-container'>
    <div className='modal-box dark-form image-modal' >
        <button className="close-modal" onClick={(e) => cancelEdit(e)}>x</button>
        <div className='modal-content'>
            <div className='edit-image-form'>
            {userImage.map((image, index) => {
                return (
                    <button className={`btn-add-image profile-image profile-img modal-miniatures`} onClick={(e) => selectImage(image)}>
                        <img src={image} alt='profile image' className={`profile-img modal-miniatures ${index !== 0 ? "inactive" : null}`}/>
                    </button>
                )
            })}
                <div className='profile-img'>
                    <button className='btn-add-image profile-image profile-img' onClick={(e) => openImageStore(e)}>
                        <FontAwesomeIcon icon={faStore} />
                    </button>
                </div>
            </div>
            <div className='btn-container'>
                <button type='button' className='btn-form cancel' onClick={(e) => cancelEdit(e)}>Cancel</button>
                <button type='submit' className='btn-form save' onClick={e => updateImage(e)}>Update</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default EditImage