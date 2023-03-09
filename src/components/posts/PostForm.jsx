import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "../../contexts/SessionContext";
const BACK_URL = import.meta.env.VITE_BACK_URL;

function PostForm({
  heading,
  isUpdating = false,
  postId,
  setAddNewPost,
  setPosts,
  posts,
  setPostsCall,
  setGroupPosts,
  groupPosts,
  groupId
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [content, setContent] = useState();
  const [section, setSection] = useState();

  const { user } = useContext(SessionContext);
  const location = useLocation().pathname;
  
  const hundleSubmit = async (e) => {
    
    e.preventDefault()

    //const jwtToken = window.localStorage.getItem('token');
    const userId = user._id;
    let group = '' 
    
    if (location === '/groups') {
      group = 'TRUE'
    } else {
      group = 'FALSE'
    }
    
    const response = await fetch(
      ` ${BACK_URL}/posts${isUpdating ? `/${postId}/update` : "/new"}`,
      {
        method: `${isUpdating ? "PUT" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type,
          content,
          section,
          createdBy: userId,
          group: group,
          groupId: groupId
        }),
      }
    );
    if (response.status === 201) {
      const data = await response.json()
      if (location === '/') {
        navigate(`/`)
        setAddNewPost(false);
        let newArr = [...posts];
        newArr = [data, ...posts]
        newArr.unshift(data);
        setPosts(newArr)
        setPostsCall(true)
      } else {
        navigate(`/groups/${groupId}`)
        setAddNewPost(false);
        let newArr = [...groupPosts];
        newArr = [data, ...groupPosts]
        setGroupPosts(newArr)
      }
    }
  };

  const cancelEdit = (e) => {
    e.preventDefault()
    setAddNewPost(false)
  }

  return (
    <div className='modal-container'>
      <div className="modal-box dark-form new-post">
        <button className="close-modal" onClick={() => setAddNewPost(false)}>x</button>
        <h1>{heading}</h1>
        <form onSubmit={e => hundleSubmit(e)} className='modal-content column-center'>
          <label>
            <p>Title</p>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
          <p>Description</p>
              <textarea cols='35' maxLength="250" rows='3' type='text' name='description' onChange={(event) => setDescription(event.target.value)}></textarea>
          </label>
          <label className="select-form">
          <p>Choose a type:</p>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">Types</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </label>
          <label>
            <p>Content:</p>
            <input type="text" value={content}
              onChange={(event) => setContent(event.target.value)}/>
          </label>
          <label className="select-form"> 
          <p>Choose a section:</p>
            <select value={section} onChange={(event) => setSection(event.target.value)}>
              <option value="">Sections</option>
              <option value="meme">Meme</option>
              <option value="lifestyle">lifestyle</option>
              <option value="gaming">Gaming</option>
              <option value="educational">Education</option>
              <option value="food">Food</option>
              <option value="business">Business</option>
            </select>
          </label>
          <div className='btn-container'>
            <button type='button' className='btn-form cancel' onClick={(e) => cancelEdit(e)}>Cancel</button>
            <button className='btn-form save' type="submit">{isUpdating ?" Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
