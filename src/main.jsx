import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext";
import PostContextProvider from "./contexts/PostContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
