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

  return (
    <div className="column-center">
      <BodyMenu />
      {!loading ? (
        <>
        <h1 className="groups-page-title postTitle">The Hoppy Community</h1>
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
