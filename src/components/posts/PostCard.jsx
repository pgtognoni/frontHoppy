import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  faAnglesDown,
  faAnglesUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionContext } from "../../contexts/SessionContext";
import { PostContext } from "../../contexts/PostContext";
import axios from "axios";
import Comments from "../comments/Comments";
import { setDisliked, setLiked } from "../../reducer/user.reducer";
import { deleteCommentAPI, updateLike, updateDislike, updateComment, updateUserLiked } from "../../methods/postMethods";

function PostCard(props) {
  // const { setUser, user, isAuthenticated, authenticated, background, setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply } =
  // useContext(SessionContext);

const { postsContext, setPostsContext, setIsLoadingPost, isLoadingPost } =
  useContext(PostContext);

  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const disliked = useSelector(state => state.user.disliked)
  const liked = useSelector(state => state.user.liked)
  const userId = useSelector(state => state.user.id)
  const images = useSelector(state => state.user.images)
  const username = useSelector(state => state.user.username)

  const {
    post,
    setProfilePost,
    setPosts,
    allposts,
    setGroupPosts
  } = props;

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(""); 

  const handleDislike = (e, id) => {
    const newArr = JSON.parse(JSON.stringify(allposts));
    const post = newArr.find(item => item._id === id);
    const newDisliked = JSON.parse(JSON.stringify(disliked));
    const newliked = JSON.parse(JSON.stringify(liked));

    if (!newDisliked.includes(id)) {
      newDisliked.push(id);
      dispatch(setDisliked(newDisliked))
      newArr.map(item =>{ 
        if (item._id === id) {
          item.dislikes += 1;
      }});

      if(newliked.includes(id)) {
        newliked.splice(newliked.indexOf(id), 1);
        dispatch(setLiked(newliked))
        newArr.map(item =>{ 
          if (item._id === id) {
            item.likes -= 1;
        }});
      }

      //UPDATE USER IN BACKEND
      const user = {liked: newliked, disliked: newDisliked}
      updateDislike(post, id);
      updateUserLiked(user)

      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
      } else {
      newDisliked.splice(newDisliked.indexOf(id), 1);
      dispatch(setDisliked(newDisliked))
      newArr.map(item =>{ 
        if (item._id === id) {
          item.dislikes -= 1;
      }});
      //UPDATE USER IN BACKEND
      const user = {liked: newliked, disliked: newDisliked}
      updateDislike(post, id);
      updateUserLiked(user)

      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
    }
  }

  const handleLike = (e, id) => {
    const newArr = JSON.parse(JSON.stringify(allposts));
    const post = newArr.find(item => item._id === id);
    const newDisliked = JSON.parse(JSON.stringify(disliked));
    const newliked = JSON.parse(JSON.stringify(liked));

    if (!newliked.includes(id)) {
      newliked.push(id);
      dispatch(setLiked(newliked))
      newArr.map(item =>{ 
        if (item._id === id) {
            item.likes += 1;
      }});

      if(newDisliked.includes(id)) {
        newDisliked.splice(newDisliked.indexOf(id), 1);
        dispatch(setDisliked(newDisliked))
        newArr.map(item =>{ 
          if (item._id === id) {
            item.dislikes -= 1;
        }});
      } 

      const user = {liked: newliked, disliked: newDisliked}
      updateLike(post, id);
      updateUserLiked(user)

      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
    } else {
      newliked.splice(newliked.indexOf(id), 1);
      dispatch(setLiked(newliked))
      newArr.map(item =>{ 
        if (item._id === id) {
            item.likes -= 1;
      }});

      const user = {liked: newliked, disliked: newDisliked}
      updateLike(post, id);
      updateUserLiked(user)
      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
    }
  };
  
/*
  const handleDislike = (e, id) => {
    const newArr = JSON.parse(JSON.stringify(allposts));
    const post = newArr.find(item => item._id === id);
    const newUser = JSON.parse(JSON.stringify(user));

    if (!user.disliked.includes(id)) {
      newUser.disliked.push(id);
      newArr.map(item =>{ 
        if (item._id === id) {
          item.dislikes += 1;
      }});
      console.log(disliked, liked)

      if(newUser.liked.includes(id)) {
        newUser.liked.splice(newUser.liked.indexOf(id), 1);
        newArr.map(item =>{ 
          if (item._id === id) {
            item.likes -= 1;
        }});
      }

      setUser(newUser);

      //UPDATE USER IN BACKEND
      updateDislike(post, id);
      updateUserLiked(user)

      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
      } else {
      newUser.disliked.splice(newUser.disliked.indexOf(id), 1);
      newArr.map(item =>{ 
        if (item._id === id) {
          item.dislikes -= 1;
      }});
      setUser(newUser);
      updateDislike(post, id);
      updateUserLiked(user)
      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }

    }
  }

  const handleLike = (e, id) => {
    const newArr = [...allposts];
    const post = newArr.find((item) => item._id === id);
    const newUser = JSON.parse(JSON.stringify(user));

    if (!user.liked.includes(id)) {
      newUser.liked.push(id);
      newArr.map(item =>{ 
        if (item._id === id) {
            item.likes += 1;
      }});

      if(user.disliked.includes(id)) {
        newUser.disliked.splice(newUser.disliked.indexOf(id), 1);
        newArr.map(item =>{ 
          if (item._id === id) {
            item.dislikes -= 1;
        }});
      } 
      setUser(newUser);
      updateLike(post, id);
      updateUserLiked(user)
      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
    } else {
      newUser.liked.splice(newUser.liked.indexOf(id), 1);
      newArr.map(item =>{ 
        if (item._id === id) {
            item.likes -= 1;
      }});
      setUser(newUser);
      updateLike(post, id);
      updateUserLiked(user)
      if (location === '/') {
        setPostsContext(newArr);
      } else {
        setGroupPosts(newArr);
      }
    }
  };
*/
  const openComments = (e, id) => {
    setShowComments(!showComments);
  };

  const handleNewComment = (e, id) => {
    e.preventDefault();
    const newArr = [...allposts];
    const comment = {
      body: newComment,
      image: images[0],
      username: username,
    };
    newArr.map((item) => {
      if (item._id === id) {
        item.comments.push(comment);
      }
    });
    updateComment(newComment, id, userId);
    setNewComment("");
    if (location === '/') {
      setPostsContext(newArr);
    } else {
        setGroupPosts(newArr);
      }
  };


  const deleteComment = (e, id) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    const newArr = [...allposts];
    newArr.map((item) => {
      if (item._id === post._id) {
        const newCommentsArray = item.comments.filter(
          (comment) => comment._id !== id
        );
        item.comments = newCommentsArray;
      }
    });

    location === "/profile" ? setProfilePost(newArr) : setPosts(newArr);

    deleteCommentAPI(id, token);
  };

  return (
    <>
      <div className="postContainer">
        <>
          <div className="postedBy">
            {!!post.createdBy ? (
              <div className="postTop">
                <div className="center">
                  <span>
                    <img
                      className="postedByImg"
                      src={post.createdBy.image[0]}
                      alt="profile"
                      loading="lazy"
                    />
                  </span>
                  <span className="postedByName">
                    {post.createdBy.username}
                  </span>
                </div>
                <div>
                  <h2 className="postTag">#{post.section}</h2>
                </div>
              </div>
            ) : null}
          </div>
        </>
        <div className="postBody">
          <div className="postContent">
            {post.type === "image" ? (
              <img className="postEmbed" src={post.content} alt="" />
            ) : (
              <iframe className="postEmbed" src={post.content}></iframe>
            )}
          </div>
          <div className="innerPost">
            <div className="postTexts">
              <h1 className="postTitle">{post.title}</h1>
              <p className="postDescription">{post.description}</p>
            </div>
            <div className="postButtonsParent">
              <button 
                className={`postInteractions ${liked.includes(post._id) ? "postInteractionsLiked" : null}`} 
                // className={`postInteractions ${user && user.liked.includes(post._id) ? "postInteractionsLiked" : null}`} 
                onClick={(e) => handleLike(e, post._id)} 
                style={post && userId === post.createdBy._id ? {pointerEvents: 'none'} : null}
                // style={post && (location === '/profile' || user._id === post.createdBy._id ) ? {pointerEvents: 'none'} : null}
                >
                    ❤️ {post.likes}
                </button>
                <button 
                  className={`postInteractions2 ${disliked.includes(post._id) ? "postInteractionsLiked postInteractionsDisiked" : null}`} 
                  // className={`postInteractions2 ${user && user.disliked.includes(post._id) ? "postInteractionsLiked postInteractionsDisiked" : null}`} 
                  onClick={(e) => handleDislike(e, post._id)} 
                  style={post && userId === post.createdBy._id ? {pointerEvents: 'none'} : null}>
                  {/* style={post && (location === '/profile' || user._id === post.createdBy._id ) ? {pointerEvents: 'none'} : null}> */}
                    😠 {post.dislikes}
                </button>
                <button className="postInteractions" onClick={(e) => openComments(e)}>
                    💬 {post.comments && post.comments.length > 0 ? post.comments.length : 0}
                </button>
            </div>
          </div>
        </div>
        {showComments ? (
          <>
            <div className="postComments">
              {post.comments && post.comments.length > 0
                ? post.comments.map((comment) => {
                    return (
                      <Comments comment={comment} key={comment._id} deleteComment={deleteComment} />
                    );
                  })
                : null}
              <form
                onSubmit={(e) => handleNewComment(e, post._id)}
                className="comment-form"
              >
                <p>Add</p>
                <input
                  type="text"
                  maxLength={140}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
              </form>
            </div>
          </>
        ) : null}
        <div className="postFooter">
          <button onClick={(e) => openComments(e, post._id)}>
            {!showComments ? (
              <FontAwesomeIcon icon={faAnglesDown} />
            ) : (
              <FontAwesomeIcon icon={faAnglesUp} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCard;
