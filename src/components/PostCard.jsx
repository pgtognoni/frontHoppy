import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard(props) {
    const location = useLocation().pathname
    const { post, handleDislike, handleLike, handleNewComment, setNewComment } = props;
    const [ showComments, setShowComments ] = useState(false)

    const openComments = (e, id) => {
        setShowComments(!showComments)
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
                <button className="postInteractions" onClick={(e) => handleLike(e, post._id)}>
                    ❤️ {post.likes}
                </button>
                <button className="postInteractions" onClick={(e) => handleDislike(e, post._id)}>
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
                            <p className='comment-username'>{comment.username}</p>
                            <p className='comment-body'>{comment.body}</p>
                        </div>
                    </div>
                )
            }) : null}
            <form onSubmit={(e)=> handleNewComment(e, post._id)} className='comment-form'>
                <p>Add</p>
                <input type="text" maxLength={140} onChange={e => setNewComment(e.target.value)} />
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