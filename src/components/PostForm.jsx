import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm({
  heading,
  postTitle ="",
  postDescription= "",
  postType ="",
  postContent = "",
  postSection ="",
  isUpdating = false,
  postId,
  setAddNewPost
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(postTitle);
  const [description, setDescription] = useState(postDescription);
  const [type, setType] = useState(postType);
  const [content, setContent] = useState(postContent);
  const [section, setSection] = useState(postSection);
  
  const hundleSubmit = async (e) => {
    
    e.preventDefault()

    //const jwtToken = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('userId');
    console.log(userId)
    const response = await fetch(
      ` http://localhost:5005/posts${isUpdating ? `/${postId}` : "/new"}`,
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
          createdBy: userId
        }),
      }
    );
    if (response.status === 201) {
      const data = await response.json()
      console.log("data....", data._id);
      navigate(`/`)
      setAddNewPost(false);
    }
    // if (response.status === 200) {
    //   navigate(`/${postId}`)
    // }
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
            {/* <input type="text" value={description}
              onChange={(event) => setDescription(event.target.value)}/> */}
              <textarea cols='35' maxLength="70" rows='3' type='text' name='description' onChange={(event) => setDescription(event.target.value)}></textarea>
          </label>
          <label className="select-form">
          <p>Choose a type:</p>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">Types</option>
              <option value="link">Link</option>
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
