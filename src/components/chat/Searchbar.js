import React from "react";
import "./ChatScreen.css";
import Chats from "./Chats";
const Searchbar = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="search user" />
      </div>
      <Chats />
    </div>
  );
};

export default Searchbar;
