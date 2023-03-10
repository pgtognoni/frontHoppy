import React, { useState, useContext, useRef, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

const Store = () => {
  const {
    setUser,
    user,
    setUserCurrency,
    setUserImage,
    userCurrency,
    background,
  } = useContext(SessionContext);
  const [currency, setCurrency] = useState(0);
  const [loading, isLoading] = useState(true);
  const [clock, setClock] = useState("");

  let date = new Date().getDay();
  let dateDetails = new Date();
  let dailyImages = [];

  function timeAdv() {
    let hours = 24 - dateDetails.getHours();
    let min = 60 - dateDetails.getMinutes();
    if ((min + "").length == 1) {
      min = "0" + min;
    }
    let sec = 60 - dateDetails.getSeconds();
    if ((sec + "").length == 1) {
      sec = "0" + sec;
    }
    let newTime = hours + "h";

    setClock(newTime);
  }

  const intervalID = setInterval(() => {
    timeAdv();
  }, 20000);

  useEffect(() => {
    timeAdv();
    setCurrency(userCurrency);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const sundayImages = [
    "https://i.seadn.io/gcs/files/c3c8704e98806a8ebb03acdd28e1c51d.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/4d451d19fc542046e44aa3bf95458491.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/e6fb8c6928bcd4afdffb9fa24e7e1cc9.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/114fbc898b9cb20e9ed0355900557778.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/90c288b336d42b3c5e0dc2c9c6cc5ce5.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/6b065978e0f6ea75b2a4d54df1b158c1.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/fd20e382aebd35eddd76ade9668a6cc9.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/9152fa321f29312af32fd13495311ff0.png?auto=format&w=1000",
  ];

  const mondayImages = [
    "https://i.seadn.io/gcs/files/467c4bc9e5babfcd97e8d698eb46ecb7.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/edd1ecd4b627f032a6b9e0da059d3433.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/8c1104584979b2f91a393b7761c7f030.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/7bc4422191d4e54ec03dd6122fbf36c4.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/c1593368b9da89d1576fd51207275948.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/c2cf516fcdfc0d65fd7938e474a29879.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/677a7084b973c7928d732fc9b8eea879.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/1d7cf7614dd5d4b5a39ef2987ed628d4.png?auto=format&w=1000",
  ];

  const tuesdayImages = [
    "https://i.seadn.io/gcs/files/aaed9a804c9d8b9f3efcc050f50ba21c.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/b5f1a67b1644ce3270909e03cb92161a.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/eec9c6e8873e05cf5cb46066be77fe39.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/c0837da52775c8acfd1a0f24976ab9e8.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/205e0ab0e908100c83e6706d513271b7.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/1bb0d4ce65edfe95d9950c0c47b4500f.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/941944de4c45173d51f37f103e227b32.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/0f01044233700b44bec44c978ce6b607.png?auto=format&w=1000",
  ];

  const wednesdayImages = [
    "https://i.seadn.io/gcs/files/6655f155c90793509aa0a55d0a87ec22.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/9bbf3d071e8efdd03d331f3cb51dc416.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/aaed9a804c9d8b9f3efcc050f50ba21c.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/fc44fc21320af8c8f83b0b74d3dc0054.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/fdc7df76123c9162c6d7381ca9750f45.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/d6b51c176d896267989284a061766d0f.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/379e6dc729bbeb2e342b850bce7fefaa.png?auto=format&w=1000",
    "https://i.seadn.io/gcs/files/6d9911acff58abc4c3d27d932d5786f5.png?auto=format&w=1000",
  ];

  if (date === 0) {
    dailyImages = [...sundayImages];
  } else if (date === 1) {
    dailyImages = [...mondayImages];
  } else if (date === 2) {
    dailyImages = [...tuesdayImages];
  } else if (date === 3) {
    dailyImages = [...wednesdayImages];
  } else if (date === 4) {
    dailyImages = [...mondayImages];
  } else if (date === 5) {
    dailyImages = [...tuesdayImages];
  } else if (date === 6) {
    dailyImages = [...wednesdayImages];
  }

  function stopLoading() {
    if (user && loading) {
      isLoading(false);
    }
  }
  stopLoading();

  function handleBuy(price, image) {
    if (
      user.currency &&
      user.currency >= price &&
      !user.image.includes(image)
    ) {
      const newImageArr = [image, ...user.image];
      updateCurrency(price, newImageArr);
    }
  }

  const updateCurrency = async (price, newImageArr) => {
    const data = { currency: user.currency - price, image: newImageArr };
    const token = window.localStorage.getItem("token");
    const res = await axios.put(`${VITE_BACK_URL}/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.currency) {
      setCurrency(res.data.currency);
      setUserCurrency(res.data.currency);
      setUserImage(res.data.image);
      setUser(res.data);
    }
  };

  return (
    <>
      <div className="fullReturn">
        <div>
          {!loading ? (
            <div className="storeBody bringItemFront">
              <h1 className="storeTitle">
                Store{" "}
                <span                 
                  id="the-final-countdown"
                >
                  New Collection in {clock}
                </span>
              </h1>

              <>
                <div className="dailyCollection">
                  <div className="legedaryCollection">
                    <h1 className="legendary">Legendary</h1>
                    <h1 className="collection">
                      Collection
                    </h1>
                  </div>
                  <div>
                    <div className="dailyCollectionContainer">
                      <div className="itemCard">
                        <img
                          className="dailyCollectionImg"
                          src={dailyImages[0]}
                          alt=""
                        />

                        <button
                          onClick={(e) => handleBuy(10, dailyImages[0])}
                          className="itemButton"
                        >
                          {user.image.includes(`${dailyImages[0]}`)
                            ? "✅"
                            : "💎 20"}
                        </button>
                      </div>
                      <div className="itemCard">
                        <img
                          className="dailyCollectionImg"
                          src={dailyImages[1]}
                          alt=""
                        />
                        <button
                          onClick={(e) => handleBuy(20, dailyImages[1])}
                          className="itemButton"
                        >
                          {user.image.includes(`${dailyImages[1]}`)
                            ? "✅"
                            : "💎 20"}
                        </button>
                      </div>
                      <div className="itemCard">
                        <img
                          className="dailyCollectionImg"
                          src={dailyImages[2]}
                          alt=""
                        />
                        <button
                          onClick={(e) => handleBuy(20, dailyImages[2])}
                          className="itemButton"
                        >
                          {user.image.includes(`${dailyImages[2]}`)
                            ? "✅"
                            : "💎 20"}
                        </button>
                      </div>
                      <div className="itemCard">
                        <img
                          className="dailyCollectionImg"
                          src={dailyImages[3]}
                          alt=""
                        />
                        <button
                          onClick={(e) => handleBuy(20, dailyImages[3])}
                          className="itemButton"
                        >
                          {user.image.includes(`${dailyImages[3]}`)
                            ? "✅"
                            : "💎 20"}
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="rowCollection">
                  <h1
                    className="extraOffers"
                  >
                    Extra Offers
                  </h1>
                  <div style={{ display: "flex" }}>
                    <div className="itemCard">
                      <img
                        className="dailyCollectionImg"
                        src={dailyImages[4]}
                        alt=""
                      />

                      <button
                        onClick={(e) => handleBuy(5, dailyImages[4])}
                        className="itemButton"
                      >
                        {user.image.includes(`${dailyImages[4]}`)
                          ? "✅"
                          : "💎 5"}
                      </button>
                    </div>
                    <div className="itemCard">
                      <img
                        className="dailyCollectionImg"
                        src={dailyImages[5]}
                        alt=""
                      />

                      <button
                        onClick={(e) => handleBuy(5, dailyImages[5])}
                        className="itemButton"
                      >
                        {user.image.includes(`${dailyImages[5]}`)
                          ? "✅"
                          : "💎 5"}
                      </button>
                    </div>
                    <div className="itemCard">
                      <img
                        className="dailyCollectionImg"
                        src={dailyImages[6]}
                        alt=""
                      />

                      <button
                        onClick={(e) => handleBuy(5, dailyImages[6])}
                        className="itemButton"
                      >
                        {user.image.includes(`${dailyImages[6]}`)
                          ? "✅"
                          : "💎 5"}
                      </button>
                    </div>
                    <div className="itemCard">
                      <img
                        className="dailyCollectionImg"
                        src={dailyImages[7]}
                        alt=""
                      />

                      <button
                        onClick={(e) => handleBuy(5, dailyImages[7])}
                        className="itemButton"
                      >
                        {user.image.includes(`${dailyImages[7]}`)
                          ? "✅"
                          : "💎 5"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
      <img className="background3d" src={background}></img>
    </>
  );
};

export default Store;
