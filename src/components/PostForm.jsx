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
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(postTitle);
  const [description, setDescription] = useState(postDescription);
  const [type, setType] = useState(postType);
  const [content, setContent] = useState(postContent);
  const [section, setSection] = useState(postSection);
  
  const hundleSubmit = async () => {
    const jwtToken = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('userId');
    const response = await fetch(
      ` http://localhost:5005/posts${isUpdating ? `/${postId}` : ""}`,
      {
        method: isUpdating ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
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
    }
    // if (response.status === 200) {
    //   navigate(`/${postId}`)
    // }
  };


  return (
    <div>
      <h1>{heading}</h1>
      <form onSubmit={hundleSubmit}>
        <label>
          Titel
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
        Description
          <input type="text" value={description}
            onChange={(event) => setDescription(event.target.value)}/>
        </label>
        <label>Choose a type:</label>
          <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">Types</option>
          <option value="link">Link</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          </select>
          <label>
          Content:
          <input type="text" value={content}
            onChange={(event) => setContent(event.target.value)}/>
        </label>
        <label> Choose a section:</label>
          <select value={section} onChange={(event) => setSection(event.target.value)}>
          <option value="">Sections</option>
          <option value="meme">Meme</option>
          <option value="lifestyle">lifestyle</option>
          <option value="gaming">Gaming</option>
          <option value="food">Food</option>
          <option value="business">Business</option>
      </select>
        <button type="submit">{isUpdating ?" Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default PostForm;
