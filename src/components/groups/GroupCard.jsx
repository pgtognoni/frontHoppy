import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
function GroupCard({ group}) {
  return (
    <div key={group._id} className="group-container postContainer" style={{ width: '100%'}}>
        <div className="postedBy postTop">
        <div className="postContent">
            <img className="postEmbed" src={group.image} alt="" />
        </div>
        <div className="postInfo">
            <h2 className="group-title">{group.name}</h2>
            <p className="postDescription">{group.description}</p>
        </div>
        <div className="postButtons">
            <button className="postInteractions" onClick={(e) => openComments(e)}>
                <Link to={`/${group._id}`} ><FontAwesomeIcon icon={faRightToBracket} /></Link>
            </button>
        </div>
        </div>
    </div>
)
}

export default GroupCard