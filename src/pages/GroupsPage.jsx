import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import GroupCard from "../components/groups/GroupCard";
import BodyMenu from "../components/BodyMenu";
import { useLocation } from 'react-router-dom';

const BACK_URL = import.meta.env.VITE_BACK_URL;

const Store = () => {

  const { background,  backgroundImages, setBackgroundImages, fetchGroups, setFetchGroups }=useContext(SessionContext);
  const [loading, isLoading] = useState(true);
  const [groups, setGroups] = useState();
  const [ tag, setTag ] = useState();
  const [ section, setSection] = useState();
  const [type, setType] = useState();
  const [ responseMessage, setResponseMessage ] = useState("");
  const location = useLocation();

  const fetchData = async () => {
    const response = await axios.get(`${BACK_URL}/groups/`);
    setGroups(response.data);
    setFetchGroups(false)
  };


  useEffect(() => {
    fetchData();
    setBackgroundImages(backgroundImages);   
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchGroups]);

  useEffect(() => {
      if (groups && loading) {
          isLoading(false);
      }
  }, [groups])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'Category') {
        const response = await axios.get(`${BACK_URL}/filter/groups/${section}`);
        console.log(response.data)
        if(response.data.message) {
          setResponseMessage(response.data.message);
      } else {
          setGroups(response.data);
          setResponseMessage('');
      }
    }
    if (type === 'Tag') {
      tag.toLowerCase()
      const response = await axios.get(`${BACK_URL}/filter/groups/tag/${tag}`);
      console.log(response.data)
      if(response.data.message) {
        setResponseMessage(response.data.message);
    } else {
        setGroups(response.data);
        setResponseMessage('');
    }
  }
}

  return (
    <div className="column-center">
      <BodyMenu />
      {!loading ? (
        <>
        <h1 className="groups-page-title postTitle">The Hoppy Community</h1>
        <form className='storeBody group-search' onSubmit={(e) => handleSubmit(e)}>
          <div className="tipe">
            <button className="btn-reset-style group-type-btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <p className=''>{type ? type : "Type"}</p>
            </button>
            <ul className="dropdown-menu">
                <li><p onClick={(event) => setType("Tag")} className="dropdown-item" value="tag" >Hashtag</p></li>
                <li><p onClick={(event) => setType("Category")} className="dropdown-item" value="category" >Category</p></li>
            </ul>
          </div>
          {type === 'Category' 
            ? <div className="category">
              <button className="btn-sidebar btn-reset-style btn-category dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <p className=''>{section ? section : "section"}</p>
              </button>
              <ul className="dropdown-menu">
                  <li><p onClick={(event) => setSection("meme")} className="dropdown-item" value="meme">Memes</p></li>
                  <li><p onClick={(event) => setSection("lifestyle")} className="dropdown-item" value="lifestyle">Lifestyle</p></li>
                  <li><p onClick={(event) => setSection("educational")} className="dropdown-item" value="educational">Education</p></li>
                  <li><p onClick={(event) => setSection("gaming")} className="dropdown-item" value="gaming">Gaming</p></li>
                  <li><p onClick={(event) => setSection("food")} className="dropdown-item" value="food">Food</p></li>
                  <li><p onClick={(event) => setSection("business")} className="dropdown-item" value="business">Business</p></li>
              </ul>
            </div>
            : type === 'Tag' 
            ? <div className="tag">
                  <input type="text" className="form-input" id="tag" value={tag} onChange={(e) => {setTag(e.target.value)}} />
             </div>
            : null
          }
          <button type="submit" className='btn-reset-style ' data-bs-toggle="modal">Go</button>
        </form>
        {responseMessage && <p style={{color: 'red', zIndex: 2}}>{responseMessage}</p>}
        {groups.map((group) => {
          return (
            <GroupCard group={group} key={group._id} />
          )
        })}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <img className="background3d" src={background}></img>
    </div>
  );
};

export default Store;
