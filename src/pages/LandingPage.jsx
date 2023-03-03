import React from "react";
import { useState, useRef } from "react";
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
  const ref = useRef();

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

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (addNewPost && ref.current && !ref.current.contains(event.target)) {
        setAddNewPost(false)
      }
    }
    const modal = document.querySelector('.modal-container');
    ref.current = modal;
    document.addEventListener('click', checkClickedOutside)
    return () => {
      document.removeEventListener('click', checkClickedOutside)
    }
  }, [ addNewPost ])

  const openModal = (e) => {
    e.stopPropagation();
    setAddNewPost(true);
  }


  return (
    <>
      {!isLoading ? (
        <div className='column-center'>
          <button className='add-new-post' onClick={e => openModal(e)}> 
            <p>Add New Post</p> 
            <span className='btn-add'>+</span>
          </button>
          {addNewPost && <PostForm setAddNewPost={setAddNewPost}/>}
          {posts.map((post) => {
            return (
              <div>
                <div className="postContainer">
                  <div className="postContent">
                    {post.type === "image" ? (
                      <img className="postImage" src={post.content} alt="" />
                    ) : (
                      <iframe
                        className="postEmbed"
                        //   width="1200px"
                        //   height="220px"
                        src={post.content}
                      ></iframe>
                    )}
                  </div>
                  <div className="innerPost">
                    <div>
                      <h1 className="postTitle">{post.title}</h1>
                      <p className="postDescription">{post.description}</p>
                    </div>
                    <div className="postButtonsParent">
                      <button className="postInteractions">
                        ❤️{post.likes}
                      </button>
                      <button className="postInteractions">
                        😠{post.likes}
                      </button>
                      <button className="postInteractions">
                        👤{post.likes}
                      </button>
                    </div>
                  </div>
                </div>                
              </div>
            );
          })}              
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default LandingPage;
