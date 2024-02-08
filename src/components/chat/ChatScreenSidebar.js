import React from "react";
import "./ChatScreen.css";
import { FaCamera } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import Messages from "./Messages";
import TextInput from "./TextInput";
const ChatScreenSidebar = () => {
  return (
    <div className="chatbar">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <BsFillCameraVideoFill />
          <IoMdPersonAdd />
          <IoIosMore />
        </div>
      </div>
      <Messages />
      <TextInput />
    </div>
  );
};

export default ChatScreenSidebar;
