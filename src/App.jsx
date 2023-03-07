import Sidebar from "./components/Sidebar";
import { useState, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import Store from "./pages/Store";
import NewPost from "./pages/NewPost";
import { SessionContext } from "./contexts/SessionContext";
import MobileNavbar from "./components/MobileNavBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {

  const {isAuthenticated} = useContext(SessionContext);
  const navigate = useNavigate();
  const [ background, setBackground ] = useState("../../public/image/Untitled - Copy@1-1904x993.png")

  const backgroundImages = [
    "./image/Untitled - Copy@1-1904x993.png",
    "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg"
   ]
   let backgroundImage = backgroundImages[0]
 
   const handleBackground = (image => {
     setBackground(backgroundImages[image])
     console.log(backgroundImage)
   })
 

  return (
    <div className="App">
      <Navbar />
      <div className="body">
        {/* <Sidebar /> */}
        <div className="body-content landingPage">
        <MobileNavbar handleBackground={handleBackground} />
          <Routes>
            <Route path="/" element={isAuthenticated ? <LandingPage background={background} /> : <HomePage />} />
            <Route path="/new" element={<NewPost/>}/>
            {!isAuthenticated
             ? <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />                
               </>
             : null
             }
            <Route path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
      <div className="fadeOut"></div>
      </div>
    </div>
  );
}

export default App;
