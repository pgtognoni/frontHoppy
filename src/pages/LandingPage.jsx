import React, { useContext } from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
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
  const [addNewPost, setAddNewPost] = useState(false);
  const [newComment, setNewComment] = useState(""); 
  const ref = useRef();

  const { setUser, user, isAuthenticated, background, setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply } =
    useContext(SessionContext);
  const { postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } =
    useContext(PostContext);

  const backgroundImagesShow1 = [
    "./image/Untitled - Copy@1-1904x993.png",
    "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
    "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
  ];

  const handleBackground = (image) => {
    if (image === "./image/Untitled - Copy@1-1904x993.png") {
      setBackgroundImages([
        "imageBackgrounChange1",
        "imageBackgrounChange2",
        "imageBackgrounChange3",
      ]);
      setBackgroundImagesApply([
        "./image/Untitled - Copy@1-1904x993.png",
        "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
        "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
      ]);
      setBackground(backgroundImagesShow1[0]);
    }
    if (
      image ===
      "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg"
    ) {
      setBackgroundImages([
        "imageBackgrounChange2",
        "imageBackgrounChange3",
        "imageBackgrounChange1",
      ]);
      setBackgroundImagesApply([        
        "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
        "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
        "./image/Untitled - Copy@1-1904x993.png",
      ]);
      setBackground(backgroundImagesShow1[1]);
    }
    if (
      image === "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg"
    ) {
      setBackgroundImages([
        "imageBackgrounChange3",
        "imageBackgrounChange1",
        "imageBackgrounChange2",
      ]);
      setBackgroundImagesApply([
        "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
        "./image/Untitled - Copy@1-1904x993.png",
        "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",        
      ]);
      setBackground(backgroundImagesShow1[2]);
    }
    console.log(image);
  };

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    setPosts(response.data);
    setPostsContext(response.data);
  };

  const updatePost = async (post, id) => {
    const data = post;
    const token = window.localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:5005/posts/${id}/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const updateComment = async (comment, id) => {
    const data = {
      user: user._id,
      body: comment,
      postId: id,
    };
    const token = window.localStorage.getItem("token");
    const res = await axios.post(`http://localhost:5005/comments/new`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const updateUserLiked = async (likedPost) => {
    const data = { liked: [...user.liked, likedPost] };
    const token = window.localStorage.getItem("token");
    const res = await axios.put("http://localhost:5005/auth/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.liked) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    setIsLoadingPost(false);
    fetchData();
    setPosts(postsContext);
    setBackgroundImages(backgroundImages);   
  }, []);
  

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    fetchData();
    setPostsCall(false);
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
    const post = newArr.find((item) => item._id === id);

    if (!user.liked.includes(id)) {
      newArr.map((item) => {
        if (item._id === id) {
          item.likes += 1;
        }
      });
      updatePost(post, id);
      updateUserLiked(post);
      setPostsContext(newArr);
    } else {
    }
  };

  const handleDislike = (e, id) => {
    const newArr = [...posts];
    newArr.map((item) => {
      if (item._id === id) {
        item.dislikes += 1;
      }
    });
    const post = newArr.find((item) => item._id === id);

    updatePost(post, id);
    setPostsContext(newArr);
  };

  const handleNewComment = (e, id) => {
    e.preventDefault();
    const newArr = [...posts];
    const comment = {
      body: newComment,
      image: user.image[0],
      username: user.username,
    };
    newArr.map((item) => {
      if (item._id === id) {
        item.comments.push(comment);
      }
    });
    updateComment(newComment, id);
    setPostsContext(newArr);
    setNewComment("");
  };

  return (
    <>
    <div className="fullReturn">
      {!isLoadingPost && isAuthenticated ? (
        <div className="column-center">
          <button className="add-new-post" onClick={(e) => openModal(e)}>
            <p>Add New Post</p>
            <span className="btn-add">➕</span>
          </button>

          <div className="backgroundsChoose">
            <button
              className={backgroundImages[0]}
              onClick={(e) => handleBackground(backgroundImagesApply[0])}
            >
              B
            </button>

            <button
              className={backgroundImages[1]}
              onClick={(e) => handleBackground(backgroundImagesApply[1])}
            >
              B
            </button>

            <button
              className={backgroundImages[2]}
              onClick={(e) => handleBackground(backgroundImagesApply[2])}
            >
              B
            </button>
          </div>

          {addNewPost && (
            <PostForm
              setPostsCall={setPostsCall}
              posts={posts}
              setPosts={setPostsContext}
              setAddNewPost={setAddNewPost}
            />
          )}
          {posts.map((post) => {
            return (
              <PostCard
                key={post._id}
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
    </div>
      <img className="background3d" src={background}></img>
    </>
  );
}

export default LandingPage;
