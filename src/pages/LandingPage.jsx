import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import PostForm from "../components/PostForm";
import {  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [ addNewPost, setAddNewPost ] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  const openModal = (e) => {
    e.preventDefault();
    setAddNewPost(true);
  }


  return (
    <>      
      {!isLoading ? (
        <>
          <button className='add-new-post' onClick={e => openModal(e)}> 
            <p>Add New Post</p> 
            <span className='btn-add'>+</span>
          </button>
          {addNewPost && <PostForm setAddNewPost={setAddNewPost}/>}
          {posts.map((post) => {
            return (
                <div key={post._id}>
                  <div className="postDiv">
                    {post.type === "image" ? <img className="postContent" src={post.content} alt=""/> : <iframe  className="postContent" width="400px" height="230px" src={post.content}></iframe>}
                    <h1 className="postTitle">{post.title}</h1>
                    <p className="postDescription">{post.description}</p>
                  </div>
                  <h2>❤️{post.likes}</h2>
                </div>
            );
          })}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default LandingPage;
