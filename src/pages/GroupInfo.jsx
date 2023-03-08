import React, { useState, useEffect, useContext, useRef } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ProfilePage() {
    const { background,  backgroundImages, setBackgroundImages }=useContext(SessionContext);
    const [group, setGroups] = useState();
    const [whatToSee, setWhatToSee] = useState("posted");
    const [isLoading, setIsLoading] = useState(true);
  
      const fetchData = async () => {
      const response = await axios.get(`http://localhost:5005/groups/`);
      setGroups(response.data);
    };
  
  
    useEffect(() => {
      fetchData();
      setBackgroundImages(backgroundImages);   
    }, []);
  
    useEffect(() => {
        if (group && isLoading) {
            isLoading(false);
            console.log(group);
        }
    }, [group])
  
  

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
  }, [group]);



  return (
    <>
      <div className="fullReturn">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="profile-container" id="profile">
            <div className="profile-header">
              <div className="profile-image">
                <img
                //   src={}
                  alt="profile image"
                  className="profile-img"
                />
              </div>
              <div className="profile-info">
                <div className="profile-title">
                  <h1>{}</h1>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <div className="profileFilterButtons">
                <button >Posted</button>
                <button >Liked</button>
              </div>
              {/* {whatToSee === "posted" && (
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
              )} */}
              {/* {whatToSee === "liked" && (
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
              )} */}
            </div>
          </div>
        )}
      </div>
      <img className="background3d" src={background}></img>
    </>
  );
}

export default ProfilePage;
