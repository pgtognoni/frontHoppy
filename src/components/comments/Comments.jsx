import React, { useState, useContext, useRef, useEffect } from "react";
import {
    faAnglesDown,
    faAnglesUp,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionContext } from "../../contexts/SessionContext";
  
function Comments( { comment, deleteComment } ) {
    const { token, setUser, user, isAuthenticated, authenticated, background, setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply }=useContext(SessionContext);

  return (
    <div className="comment-container">
    <div className="nav-profile-img">
      <img
        className="comment-img"
        src={comment.image}
        alt="profile"
        loading="lazy"
      />
    </div>
    <div className="comment-text">
      <div>
        <p className="comment-username">
          {comment.username}
        </p>
        <p className="comment-body">{comment.body}</p>
      </div>
      {(comment.user && comment.user === user._id) ||
      location === "/profile" ? (
        <>
          <button
            className="btn-delete"
            onClick={(e) => deleteComment(e, comment._id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </>
      ) : null}
    </div>
  </div>
)
}

export default Comments