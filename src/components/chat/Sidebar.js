import React from "react";
import "./ChatScreen.css";
import NavScreen from "./NavScreen";
import Searchbar from "./Searchbar";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavScreen />
      <Searchbar />
    </div>
  );
};

export default Sidebar;
