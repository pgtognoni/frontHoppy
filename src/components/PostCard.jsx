import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { faAnglesDown, faAnglesUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionContext } from "../contexts/SessionContext";
import axios from 'axios'

function PostCard(props) {
    const location = useLocation().pathname
    const { post, handleDislike, handleLike, handleNewComment, newComment, setNewComment, setProfilePost, setPosts, allposts } = props;
    const [ showComments, setShowComments ] = useState(false)
    const { user, token } = useContext(SessionContext)

    const openComments = (e, id) => {
        setShowComments(!showComments)
    }

    const deleteAPI = async (id) => {
        const res = await axios.delete(`http://localhost:5005/comments/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(res.data)
    }

    const deleteComment = (e, id) => {
        e.preventDefault();
        const newArr = [...allposts];
        newArr.map( item => {
            if (item._id === post._id) {
                const newCommentsArray = item.comments.filter(comment => comment._id !== id)
                item.comments = newCommentsArray;
            }
        })
        location === "/profile"
            ? setProfilePost(newArr) 
            : setPosts(newArr);

        deleteAPI(id)
    }

  return (
    <>
    <div className="postContainer">
        {location !== '/profile'
        ? <>
        <div className="postedBy">
            {!!post.createdBy
                ? <>
                <div className='nav-profile-img'>
                    <img className="postedByImg" src={post.createdBy[0].image[0]} alt="profile" loading="lazy"/>
                </div>
                <h1 className="postedByName">{post.createdBy[0].username}</h1>
                </>
                : null
            }
        </div>
          </>
        : null 
        }
        <div className='postBody'>
            <div className="postContent">
                {post.type === "image" ? (
                <img className="postEmbed" src={post.content} alt="" />
                ) : (
                <iframe
                    className="postEmbed"
                    src={post.content}
                ></iframe>
                )}
            </div>
            <div className="innerPost">
                <div className="postTexts">
                    <h1 className="postTitle">{post.title}</h1>
                    <p className="postDescription">{post.description}</p>
                </div>
                <div className="postButtonsParent">
                {/* {!user.liked.includes(post._id) 
                ?  */}
                <button className={`postInteractions ${user.liked.includes(post._id) ? "postInteractionsLiked" : null}`} onClick={(e) => handleLike(e, post._id)} style={location === '/profile' ? {pointerEvents: 'none'} : null}>
                    ❤️ {post.likes}
                </button>
                
                
                <button className={`postInteractions ${user.disliked.includes(post._id) ? "postInteractionsLiked" : null}`} onClick={(e) => handleDislike(e, post._id)} style={location === '/profile' ? {pointerEvents: 'none'} : null}>
                    😠 {post.dislikes}
                </button>
                <button className="postInteractions" onClick={(e) => openComments(e)}>
                    💬 {post.comments && post.comments.length > 0 ? post.comments.length : 0}
                </button>
                </div>                    
            </div>
        </div>
        {showComments
        ? <>
        <div className="postComments">
            {post.comments && post.comments.length > 0 ? post.comments.map((comment) => {
                return (
                    <div className='comment-container'>
                        <div className='nav-profile-img'>
                            <img className="comment-img" src={comment.image} alt="profile" loading="lazy"/> 
                        </div>
                        <div className='comment-text'>
                            <div>
                            <p className='comment-username'>{comment.username}</p>
                            <p className='comment-body'>{comment.body}</p>
                            </div>
                            {comment.user && comment.user[0] === user._id || location === '/profile'
                             ? <>
                                <button className='btn-delete' onClick={(e) => deleteComment(e, comment._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                             </>
                             : null
                             }
                        </div>
                    </div>
                )
            }) : null}
            <form onSubmit={(e)=> handleNewComment(e, post._id)} className='comment-form'>
                <p>Add</p>
                <input type="text" maxLength={140}  value={newComment} onChange={e => setNewComment(e.target.value)} />
                <button type="submit">Post</button>
            </form>
        </div>
        </>
        : null
        }
        <div className="postFooter">
            <button onClick={(e) => openComments(e, post._id)}>
                {!showComments 
                    ? <FontAwesomeIcon icon={faAnglesDown} />
                    : <FontAwesomeIcon icon={faAnglesUp} />
                }
            </button>
        </div>
    </div>
    </>
    )
}

export default PostCard