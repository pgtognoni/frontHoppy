import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [addNewPost, setAddNewPost] = useState(false);
  const ref = useRef();

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    setPosts(response.data);
  };

  const updatePost = async (post, id) => {
    const data = post
    const token = window.localStorage.getItem('token')
    const res = await axios.put(`http://localhost:5005/posts/${id}/update`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (addNewPost && ref.current && !ref.current.contains(event.target)) {
        setAddNewPost(false);
      }
    };
    const modal = document.querySelector(".modal-container");
    ref.current = modal;
    document.addEventListener("click", checkClickedOutside);
    return () => {
      document.removeEventListener("click", checkClickedOutside);
    };
  }, [addNewPost]);

  const openModal = (e) => {
    e.stopPropagation();
    setAddNewPost(true);
  };

  const handleLike = (e, id) => {
    const newArr = [...posts];
    newArr.map(item =>{ 
      if (item._id === id) {
          item.likes += 1;
      }});
    const post = newArr.find(item => item._id === id);
    updatePost(post, id);
    setPosts(newArr);
  }

  const handleDislike = (e, id) => {
    const newArr = [...posts];
    newArr.map(item =>{ 
      if (item._id === id) {
          item.dislikes += 1;
      }});
    const post = newArr.find(item => item._id === id);
    updatePost(post, id);
    setPosts(newArr);
  }

  return (
    <>
      {!isLoading ? (
        <div className="column-center">
          <button className="add-new-post" onClick={(e) => openModal(e)}>
            <p>Add New Post</p>
            <span className="btn-add">+</span>
          </button>
          {addNewPost && <PostForm setAddNewPost={setAddNewPost} />}
          {posts.map((post) => {
            return (
              <PostCard key={post._id} 
                post={post} 
                handleLike={handleLike} 
                handleDislike={handleDislike}/>
            );
          })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <iframe
        className="background3d"
        src="https://my.spline.design/untitledcopy-858101b02d0e98d0da4179fadde8c638/"
      ></iframe>
    </>
  );
}

export default LandingPage;
