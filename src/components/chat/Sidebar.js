import React from "react";
import "./ChatScreen.css";
import NavScreen from "./NavScreen";
import Searchbar from "./Searchbar";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavScreen />
      <Searchbar />
      <p style={{ color: "white" }}>sidebattttt</p>
    </div>
  );
};

export default Sidebar;
