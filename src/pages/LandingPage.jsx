import React, { useContext } from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import PostForm from '../components/posts/PostForm'
import PostCard from "../components/posts/PostCard";
import { SessionContext } from "../contexts/SessionContext";
import {} from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "../contexts/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BodyMenu from "../components/BodyMenu";
import { updateLike, updateDislike, updateComment, updateUserLiked } from "../methods/postMethods";
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [postsCall, setPostsCall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addNewPost, setAddNewPost] = useState(false);
  //const [newComment, setNewComment] = useState(""); 
  const ref = useRef();

  const { setUser, user, isAuthenticated, authenticated, background, setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply } =
    useContext(SessionContext);
  const { postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } =
    useContext(PostContext);

  const fetchData = async () => {
    const response = await axios.get(`${VITE_BACK_URL}/posts`);
    setPosts(response.data);
    setPostsContext(response.data);
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

  // const handleLike = (e, id) => {
  //   const newArr = [...posts];
  //   const post = newArr.find((item) => item._id === id);

  //   if (!user.liked.includes(id)) {
  //     const newUser = {...user};
  //     newUser.liked.push(id);
  //     newArr.map(item =>{ 
  //       if (item._id === id) {
  //           item.likes += 1;
  //     }});

  //     if(user.disliked.includes(id)) {
  //       newUser.disliked.splice(newUser.disliked.indexOf(id), 1);
  //       newArr.map(item =>{ 
  //         if (item._id === id) {
  //           item.dislikes -= 1;
  //       }});
  //     } 
  //     setUser(newUser);
  //     updateLike(post, id);
  //     updateUserLiked(user)
  //     setPostsContext(newArr);      
  //   } else {
  //   }
  // };

  // const handleDislike = (e, id) => {
  //   const newArr = [...posts];
  //   const post = newArr.find(item => item._id === id);

  //   if (!user.disliked.includes(id)) {
  //     const newUser = {...user};
  //     newUser.disliked.push(id);
  //     newArr.map(item =>{ 
  //       if (item._id === id) {
  //         item.dislikes += 1;
  //     }});

  //     if(newUser.liked.includes(id)) {
  //       newUser.liked.splice(newUser.liked.indexOf(id), 1);
  //       newArr.map(item =>{ 
  //         if (item._id === id) {
  //           item.likes -= 1;
  //       }});
  //     }

  //     setUser(newUser);
  //     updateDislike(post, id);
  //     updateUserLiked(user)
  //     setPostsContext(newArr);
        
  //   } else {
  //     console.log("already disliked")
  //   }
  // }

  // const handleNewComment = (e, id) => {
  //   e.preventDefault();
  //   const newArr = [...posts];
  //   const comment = {
  //     body: newComment,
  //     image: user.image[0],
  //     username: user.username,
  //   };
  //   newArr.map((item) => {
  //     if (item._id === id) {
  //       item.comments.push(comment);
  //     }
  //   });
  //   updateComment(newComment, id, user);
  //   setPostsContext(newArr);
  //   setNewComment("");
  // };

  return (
    <>
    <div className="fullReturn">
      {!isLoadingPost && isAuthenticated ? (
        <div className="column-center">
          <BodyMenu openModal={openModal} />
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
                //handleLike={handleLike}
                //handleDislike={handleDislike}
                //handleNewComment={handleNewComment}
                //setNewComment={setNewComment}
                //newComment={newComment}
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
