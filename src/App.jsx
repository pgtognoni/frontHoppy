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
import GroupsPage from "./pages/GroupsPage";
import GroupInfo from "./pages/GroupInfo";
import { SessionContext } from "./contexts/SessionContext";
import MobileNavbar from "./components/MobileNavBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {

  const {isAuthenticated, authenticated } = useContext(SessionContext);
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        {/* <Sidebar /> */}
        <div className="body-content landingPage">
          <MobileNavbar />
          <Routes>
            {/* <Route path="/" element={!isAuthenticated ? <LandingPage /> : <HomePage />} /> */}
            {!isAuthenticated
             ? <>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />                
               </>
             : <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/new" element={<NewPost/>}/>
                <Route path="/store" element={<Store />} />
                <Route path='/groups' element={<GroupsPage />} />
                <Route path='/groups/:id' element={<GroupInfo />} />
             </>
             }
          </Routes>
        </div>
      <div className="fadeOut"></div>
      </div>
    </div>
  );
}

export default App;
