import React, { useContext } from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios"
import "../App.css";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { SessionContext } from "../contexts/SessionContext";
import {} from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "../contexts/PostContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [postsCall, setPostsCall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ background, setBackground ] = useState("../../public/image/Untitled - Copy@1-1904x993.png")
  const [addNewPost, setAddNewPost] = useState(false);
  const [newComment, setNewComment] = useState("");
  const ref = useRef();

 const { setUser, user, isAuthenticated } = useContext(SessionContext);
 const { postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } = useContext(PostContext);

 
 const backgroundImages = [
   "./image/Untitled - Copy@1-1904x993.png",
   "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg"
  ]
  let backgroundImage = backgroundImages[0]

  const handleBackground = (image => {
    setBackground(backgroundImages[image])
    console.log(backgroundImage)
  })

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    setPosts(response.data);
    setPostsContext(response.data);
  };

  const updatePost = async (post, id, status) => {
    const data = { data: post, status: {status} }
    const token = window.localStorage.getItem('token')
    const res = await axios.put(`http://localhost:5005/posts/${id}/update`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
  }

  const updateComment = async (comment, id) => {
    const data = {
      user: user._id,
      body: comment,
      postId: id
    }  
    const token = window.localStorage.getItem('token')
    const res = await axios.post(`http://localhost:5005/comments/new`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
  }

  const updateUserLiked = async (likedPost) => {
    const data = { liked: [...user.liked,  likedPost]};
    const token = window.localStorage.getItem("token");
    const res = await axios.put("http://localhost:5005/auth/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.liked) {        
      setUser(res.data);
      console.log("NEW LIKED", user.liked)
    }
  }; 

  useEffect(() => {    
      setIsLoadingPost(false)      
      fetchData()
      setPosts(postsContext)    
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    fetchData()
    setPostsCall(false)
  }, [postsCall]);

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
    const post = newArr.find(item => item._id === id);
    
    if (!user.liked.includes(id)) {
      newArr.map(item =>{ 
        if (item._id === id) {
            item.likes += 1;
        }});
      updatePost(post, id, 'like');
      updateUserLiked(post)
      setPostsContext(newArr);
      console.log("LIKED FOR FIRST TIME")
    } else {
      console.log("already liked")
    }
  }

  const handleDislike = (e, id) => {
    const newArr = [...posts];
    newArr.map(item =>{ 
      if (item._id === id) {
          item.dislikes += 1;
      }});
    const post = newArr.find(item => item._id === id);
    
    updatePost(post, id, 'dislike');
    setPostsContext(newArr);
  }

  const handleNewComment = (e, id) => { 
    e.preventDefault();
    const newArr = [...posts];
    const comment = {
      body: newComment,
      image: user.image[0],
      username: user.username
    }
    newArr.map(item =>{ 
      if (item._id === id) {
          item.comments.push(comment);
      }
    });
    updateComment(newComment, id);
    setPostsContext(newArr);
    setNewComment("");
  }

  return (
    <>
      {!isLoadingPost && isAuthenticated ? (
        <div className="column-center">
          <button className="add-new-post" onClick={(e) => openModal(e)}>
            <p>Add New Post</p>
            <span className="btn-add">+</span>
          </button>
          <div >
            <button className="imageBackgrounChange1" onClick={(e) => handleBackground(0)}></button>
          </div>
          <div >
            <button className="imageBackgrounChange2" onClick={(e) => handleBackground(1)}></button>
          </div>
          {addNewPost && <PostForm setPostsCall={setPostsCall} posts={posts} setPosts={setPostsContext} setAddNewPost={setAddNewPost} />}
          {posts.map((post) => {
            return (
              <PostCard key={post._id} 
                post={post} 
                allposts={posts} 
                handleLike={handleLike} 
                handleDislike={handleDislike}
                handleNewComment={handleNewComment}
                setNewComment={setNewComment}
                newComment={newComment}
                setPosts={setPostsContext}
                />
            );
          })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <img
        className="background3d"
        src={background}
      ></img>
    </>
  );
}

export default LandingPage;
