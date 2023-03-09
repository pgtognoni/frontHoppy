import React, { useState, useEffect, useContext, useRef } from "react";
import AddBio from "../components/user/AddBio";
import LoginForm from "../components/user/LoginForm";
import PostForm from "../components/posts/PostForm";
import { SessionContext } from "../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditImage from "../components/user/EditImage";
import ImageStore from "../components/ImageStore";
import PostCard from "../components/posts/PostCard";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;

function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});
  const [profilePost, setProfilePost] = useState([]);
  const [profilePost2, setProfilePost2] = useState([]);
  const [whatToSee, setWhatToSee] = useState("posted");
  const [isLoading, setIsLoading] = useState(true);
  const [editBio, setEditBio] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [imageStore, setImageStore] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [bio, setBio] = useState("");
  const ref = useRef();

  const { userImage, user, background, setBackground } =
    useContext(SessionContext);   

    
  useEffect(() => {
    const token = window.localStorage.getItem("token"); 

    const fetchAPI = async () => {
      const res = await fetch(`${BACK_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      setUserProfile(json.user);
      setBio(user.bio);
      setProfilePost(json.user.published);
      console.log(json.user)
    };
      
    const fetchAPILiked = async () => {
      const res = await fetch(`${BACK_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const json = await res.json();      
      setProfilePost2(json.user.liked);      
    };    
    fetchAPILiked();
    fetchAPI();
  }, []);

  

  const seeMine = (tag) => {
    if (tag === "posted") {      
      setWhatToSee(tag);      
    }    
    if (tag === "liked") {      
      setWhatToSee(tag);        
    }   
  }


  useEffect(() => {
    setIsLoading(false);
  }, [userProfile]);

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (editBio && ref.current && !ref.current.contains(event.target)) {
        setEditBio(false);
      }
      if (editImage && ref.current && !ref.current.contains(event.target)) {
        setEditImage(false);
      }
      if (imageStore && ref.current && !ref.current.contains(event.target)) {
        setImageStore(false);
      }
    };
    const modal = document.querySelectorAll(".modal-container");
    modal.forEach((modal) => {
      ref.current = modal;
    });
    document.addEventListener("click", checkClickedOutside);
    return () => {
      document.removeEventListener("click", checkClickedOutside);
    };
  }, [editBio, editImage, imageStore]);

  const openEditInfo = (e) => {
    e.stopPropagation();
    setEditBio(true);
  };

  const openEditImage = (e) => {
    e.stopPropagation();
    setEditImage(true);
  };

  const openImageStore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageStore(true);
    setEditImage(false);
  };

  return (
    <>
      <div className="fullReturn fullReturn2">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="profile-container" id="profile">
            <div className="profile-header">
              <div className="profile-image">
                <img
                  src={userImage[0]}
                  alt="profile image"
                  className="profile-img"
                />
                <button
                  onClick={(e) => openEditImage(e)}
                  className="edit-btn edit-image profEdit"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {editImage && (
                  <EditImage
                    setEditImage={setEditImage}
                    openImageStore={openImageStore}
                    setNewImage={setNewImage}
                    newImage={newImage}
                  />
                )}
                {imageStore && (
                  <ImageStore
                    setNewImage={setNewImage}
                    setImageStore={setImageStore}
                  />
                )}
              </div>
              <div className="profile-info">
                <div className="profile-title">
                  <h1 className="profUsername">{user.username}</h1>
                  <button onClick={(e) => openEditInfo(e)} className="edit-btn">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
                {bio ? <h5 className="bio">{bio}</h5> : <h5 className="text-gray bio">Add Bio</h5>}
                {editBio ? (
                  <AddBio bio={bio} setBio={setBio} setEditBio={setEditBio} />
                ) : null}
              </div>
            </div>
            <div className="profile-body">
              <div className="profileFilterButtons">
                <button onClick={(e) => seeMine("posted")}>Posted</button>
                <button onClick={(e) => seeMine("liked")}>Liked</button>
              </div>
              {whatToSee === "posted" && (
                <div className="profile-posts">
                  {profilePost.map((post) => {
                    return (
                      <PostCard
                        key={post._id}
                        post={post}
                        setProfilePost={setProfilePost}
                        allposts={profilePost}
                      />
                    );
                  })}
                </div>
              )}
              {whatToSee === "liked" && (
                <div className="profile-posts">
                  {profilePost2.map((post) => {
                    return (
                      <PostCard
                        key={post._id}
                        post={post}
                        setProfilePost={setProfilePost}
                        allposts={profilePost}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <img className="background3d" src={background}></img>
    </>
  );
}

export default ProfilePage;
