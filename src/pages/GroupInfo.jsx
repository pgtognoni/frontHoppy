import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { PostContext } from "../contexts/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PostCard from "../components/posts/PostCard";
import PostForm from "../components/posts/PostForm";
import Comments from "../components/comments/Comments";
import BodyMenu from "../components/BodyMenu";
import axios from "axios";
import { deleteCommentAPI, updateLike, updateDislike, updateGroupComment, updateUserLiked } from "../methods/postMethods";
import { updateGroupLiked } from "../methods/groupMethods";
const BACK_URL = import.meta.env.VITE_BACK_URL;


function GroupInfo () {
    const { background, setUpdateUser, backgroundImages, setBackgroundImages, setUser, user }=useContext(SessionContext);
    const { groupPostsCtx, setGroupPostsCtx } = useContext(PostContext);
    
    const [group, setGroup] = useState();
    const [ groupPosts, setGroupPosts ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ groupComments, setGroupComments ] = useState([]);
    const [whatToSee, setWhatToSee] = useState("posts");
    const [isLoading, setIsLoading] = useState(true);
    const [ addNewPost, setAddNewPost] = useState(false);
    const [newComment, setNewComment] = useState(""); 
    const [ join, setJoin] = useState(true);
    const ref = useRef();
    const { id } = useParams();
    const location = useLocation().pathname;
    
    const fetchData = async () => {
        const userId = user._id
        const response = await axios.get(`${BACK_URL}/groups/${id}/${userId}`);
        setGroup(response.data.group);
    };
  
  
    useEffect(() => {
      fetchData();
      setBackgroundImages(backgroundImages);   
    }, []);

    useEffect(() => {
        fetchData();
      }, [location]);
  
    useEffect(() => {
        if (group && isLoading) {
            setIsLoading(false);
            let posts = []
            if (group.posts.length > 0) {
               posts = group.posts;
            }             
            const members = group.members;
            const comments = group.comments;
            const alreadyJoin = group.members.filter((member) =>(member._id === user._id))
            if (alreadyJoin.length < 1) {
                setJoin(false);
            }
            setGroupPostsCtx(posts)
            setMembers(members)
            setGroupComments(comments)
        }
    }, [group])

    // useEffect(() => {

    // }, [groupComments])
  
    // useEffect(() => {
    //     const checkClickedOutside = (event) => {
    //       if (addNewPost && ref.current && !ref.current.contains(event.target)) {
    //         setAddNewPost(false);
    //       }
    //     };
    //     const modal = document.querySelector(".modal-container");
    //     ref.current = modal;
    //     document.addEventListener("click", checkClickedOutside);
    //     return () => {
    //       document.removeEventListener("click", checkClickedOutside);
    //     };
    // }, [addNewPost]);

    const handleLike = async (e, groupId) => {
        const newObj = {...group};
        const newUser = {...user};
    
        if (user.liked.includes(groupId)) {
            newUser.liked.splice(newUser.liked.indexOf(groupId), 1);
            newObj.likes -= 1;
            setGroup(newObj)
            setUser(newUser)
            updateGroupLiked(newObj, groupId)
            updateUserLiked(newUser)
        } else {
            newObj.likes += 1;
            newUser.liked.push(groupId);
            console.log(newUser.liked, user.liked);
            setGroup(newObj)
            setUser(newUser)
            updateGroupLiked(newObj, groupId)
            updateUserLiked(newUser)
        }
    }
    
    const handleNewComment = (e, id) => {
        e.preventDefault();
        const newObj = {...group}
        const comment = {
          body: newComment,
          image: user.image[0],
          username: user.username,
        };
        newObj.comments.push(comment);
        updateGroupComment(newComment, id, user);
        setNewComment("");
        setGroup(newObj);
        setGroupComments([...groupComments, comment]);
    };
    
    
    const deleteComment = (e, id) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    const newObj = JSON.parse(JSON.stringify(group))
    const newCommentsArray = newObj.comments.filter((item) => item.user !== user._id) 
    newObj.comments = newCommentsArray;
    
    setGroupPosts(newObj);
    setGroupComments(newCommentsArray);  
    deleteCommentAPI(id, token);
    };
    

    const seeMine = (tag) => {
        if (tag === "posts") {      
        setWhatToSee(tag);      
        }    
        if (tag === "members") {      
        setWhatToSee(tag);        
        } 
        if (tag === "chat") {      
            setWhatToSee(tag);        
        }   
    }


    const joinGroup = async () => {
        const data = user._id;
        console.log(data)
        const token = window.localStorage.getItem('token')
        const res = await axios.put(`${BACK_URL}/groups/join/${id}`, {data}, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        if (res.status === 200) {
            setMembers(prev => [...prev, user]);
            setJoin(true);
            setUpdateUser(true)
        }
    }

    const openModal = (e) => {
        e.stopPropagation();
        setAddNewPost(true);
      };
    

  return (
    <>
      <div className="fullReturn">
      <BodyMenu />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="profile-container groups-container" id="profile">
            <div className="profile-header groups-header">
              <div className="profile-image groups-image">
                <img
                    src={group.image}
                    alt="profile image"
                    className="postEmbed groups-embed"
                />
              </div>
              <div className="profile-info groups-info">
                <div>
                  <h2 className="postTag groups-tag">#{group.section}</h2>
                </div>
                <h1 className="postTitle groups-page-title">{group.name}</h1>
                <div className="center groups-prof">
                    <span>
                        <img
                        className="postedByImg groups-img"
                        src={group.createdByImg}
                        alt="profile"
                        loading="lazy"
                        />
                    </span>
                    <span className="postedByName groups-name">
                        By {group.createdByName}
                    </span>
                </div>
              </div>
            </div>
            <div className="profile-body groups-body">
                <div className="postTexts groups-texts">
                    <p className="postDescription groups-description">{group.description}</p>
                    {group.tags.map((tag) => {
                        return(
                            <>
                                <span> #{tag} </span>
                            </>
                        )
                    })}
                </div>
                <div className="profileFilterButtons groups-buttons">
                    <button className="groups-button" onClick={(e) => seeMine("posts")}>Posts</button>
                    <button className="groups-button" onClick={(e) => seeMine("members")}> 👤  {members.length}</button>
                    {join 
                    ? <button className="groups-button" data-bs-toggle="modal" data-bs-target="#createNewPost">New Post</button>
                    : <button className="groups-button" onClick={(e) => joinGroup()}>JOIN</button>}
                    <button className="groups-button" onClick={(e) => seeMine("chat")}>Chat 💬 </button>
                    <button 
                        className={`postInteractions groups-button ${user && user.liked.includes(group._id) ? "postInteractionsLiked" : null}`} 
                        onClick={(e) => handleLike(e, group._id)} 
                        style={group && user._id === group.createdBy._id  ? {pointerEvents: 'none'} : null}
                        >
                        ❤️ {group.likes}
                    </button>
                </div>
                {whatToSee === "posts" && (
                <div className="profile-posts">
                    {groupPostsCtx.map((post) => {
                        return (
                        <>
                            <PostCard post={post} allposts={groupPosts} setGroupPosts={setGroupPosts} />
                        </>
                        );
                    })}
                </div>
                )}
              {whatToSee === "members" && (
                <div className="profile-posts">
                  {members.map((member) => {
                    return (
                        <div className="profile-header">
                        <button className="nav-profile-img btn-reset-style" data-bs-toggle="dropdown">
                            <Link to={`user/${member._id}`}><img
                            src={member.image[0]}
                            className="profile-img"
                            /></Link>
                        </button>
                        <p>{member.username}</p>
                        </div>
                    );
                  })}
                </div>
              )}
              {whatToSee === "chat" && (
                <div className="postComments">
                    {groupComments && groupComments.length > 0
                        ? groupComments.map((comment) => {
                            return (
                                <Comments comment={comment} key={comment._id} deleteComment={deleteComment} />
                            );
                        })
                        : null}
                    <form
                        onSubmit={(e) => handleNewComment(e, group._id)}
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
              )}

            </div>
          </div>
        )}
      </div>
      {console.log("BACKGROUND", background)}
      <div className="background3d background3dblack"></div>
    </>
  );
}

export default GroupInfo;
