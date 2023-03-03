import Sidebar from "./components/Sidebar";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import NewPost from "./pages/NewPost";
import PostDetils from "./pages/PostDetils";
import UpdatePost from "./pages/UpdatePost";



function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='body'>
        <Sidebar />
        <div className='body-content landingPage'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:postId" element={<PostDetils />} />
            <Route path="/new" element={<NewPost/>}/>
            <Route path="/update/:postId" element={<UpdatePost/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
              } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
