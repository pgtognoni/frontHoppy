import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import GroupCard from "../components/groups/GroupCard";
import BodyMenu from "../components/BodyMenu";
const BACK_URL = import.meta.env.VITE_BACK_URL;

const Store = () => {

  const { background,  backgroundImages, setBackgroundImages }=useContext(SessionContext);
  const [loading, isLoading] = useState(true);
  const [groups, setGroups] = useState();
  const [ tag, setTag ] = useState();
  const [ section, setSection] = useState();
  const [type, setType] = useState();

  const fetchData = async () => {
    const response = await axios.get(`${BACK_URL}/groups/`);
    setGroups(response.data);
  };


  useEffect(() => {
    fetchData();
    setBackgroundImages(backgroundImages);   
  }, []);

  useEffect(() => {
      if (groups && loading) {
          isLoading(false);
      }
  }, [groups])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="column-center">
      <BodyMenu />
      {!loading ? (
        <>
        <h1 className="groups-page-title postTitle">The Hoppy Community</h1>
        <form className='storeBody group-search storeBody' onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <p className=''>{type ? type : "type"}</p>
            </button>
            <ul className="dropdown-menu">
                <li><p onClick={(event) => setType("tag")} className="dropdown-item" value="tag" >Hashtag</p></li>
                <li><p onClick={(event) => setType("category")} className="dropdown-item" value="category" >Category</p></li>
            </ul>
          </div>
          {type === 'category' 
            ? <div className="mb-3">
              <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
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
            : <div className="mb-3">
                  <label htmlFor="tag" className="col-form-label"></label>
                  <input type="text" className="form-control" id="tag" value={tag} onChange={(e) => {setTag(e.target.value)}} />
            </div>
          }
        </form>
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
