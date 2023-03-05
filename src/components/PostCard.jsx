import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard(props) {
    const location = useLocation().pathname
    const { post, handleDislike, handleLike } = props;
    const [ showComments, setShowComments ] = useState(false)

    const openComments = (e, id) => {
        console.log(id)
        setShowComments(true)
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
                <button className="postInteractions" onClick={(e) => handleLike(e, post._id)}>
                    💬 {post.comments && post.comments.length > 0 ? post.comments.length : 0}
                </button>
                </div>                    
            </div>
        {showComments
         ? <>
            <div className="postComments">
                <div className='comment-container'>
                    <div className='nav-profile-img'>
                        {/* <img className="comment-img" src={} alt="profile" loading="lazy"/> */}
                    </div>
                </div>
            </div>
          </>
         : null
        }
        </div>
        <div className="postFooter">
            <button onClick={(e) => openComments(e, post._id)}><FontAwesomeIcon icon={faAnglesDown} /></button>
        </div>
    </div>
    </>
    )
}

export default PostCard