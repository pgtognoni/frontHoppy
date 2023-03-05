import React, { useState, useContext, useRef, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const Store = () => {
  const { setUser, user } = useContext(SessionContext);
  const [currency, setCurrency] = useState(0);
  const [loading, isLoading] = useState(true);

  console.log("USER", user);

  const dailyImages = [
    "https://i.seadn.io/gcs/files/c3c8704e98806a8ebb03acdd28e1c51d.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/4d451d19fc542046e44aa3bf95458491.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/e6fb8c6928bcd4afdffb9fa24e7e1cc9.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/114fbc898b9cb20e9ed0355900557778.png?auto=format&w=1000",
  ];

  function stopLoading () {
    if (user && loading) {
        isLoading(false)
    }
  }
  stopLoading()

  function handleBuy(price, image) {
    console.log("PRICE", price);
    console.log("IMAGE", image);
    console.log("CURRENT", currency);
    setCurrency(user.currency);
    if (user.currency && currency > 0 && !user.image.includes(image)) {
      console.log("buying!");
      const newImageArr = [...user.image, image]
      console.log("PROCESSING", newImageArr);
      updateCurrency(price, newImageArr);
    }
  }

  const updateCurrency = async (price, newImageArr) => {
    const data = { currency: currency - price, image: newImageArr};
    const token = window.localStorage.getItem("token");
    const res = await axios.put("http://localhost:5005/auth/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.currency) {
      setCurrency(res.data.currency);
      setUser(res.data);
    }
  };

  let date = new Date().getDay();
  console.log(date);
  return (
    <div className="storeBody">
    {!loading ? 
    <div>
    <h1 className="storeTitle">Store</h1>
      <div className="dailyCollection">
        <div>
          <h1 style={{ fontSize: "250px" }}>Daily</h1>
          <h1>Collection</h1>
        </div>
        {date === 0 ? (
          <div className="dailyCollectionContainer">
            <div className="itemCard">
              <img
                className="dailyCollectionImg"
                src={dailyImages[0]}
                alt=""
              />
              {console.log("IMAGES", user.image)}
              <button onClick={(e) => handleBuy(10, dailyImages[0])} className="itemButton">
              {user.image.includes(`${dailyImages[0]}`) ? "✅": "🪙 10" }
              </button>
            </div>
            <div className="itemCard">
              <img
                className="dailyCollectionImg"
                src={dailyImages[1]}
                alt=""
              />
              <button onClick={(e) => handleBuy(10, dailyImages[1])} className="itemButton">
              {user.image.includes(`${dailyImages[1]}`) ? "✅": "🪙 10" }
              </button>
            </div>
            <div className="itemCard">
              <img
                className="dailyCollectionImg"
                src={dailyImages[2]}
                alt=""
              />
              <button onClick={(e) => handleBuy(10, dailyImages[2])} className="itemButton">
              {user.image.includes(`${dailyImages[2]}`) ? "✅": "🪙 10" }
              </button>
            </div>
            <div className="itemCard">
              <img
                className="dailyCollectionImg"
                src={dailyImages[3]}
                alt=""
              />
              <button onClick={(e) => handleBuy(10, dailyImages[3])} className="itemButton">
              {user.image.includes(`${dailyImages[3]}`) ? "✅": "🪙 10" }
              </button>
            </div>
          </div>
        ) : null}
      </div> 
      </div>
    :
    <h1>Loading...</h1>
    }
           
    </div>
  );
};

export default Store;
