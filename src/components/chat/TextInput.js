import React from "react";
import "./ChatScreen.css";
import { IoIosAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
const TextInput = () => {
  return (
    <>
      <div className="input">
        <input text="text" placeholder="Type Something....." />
        <div className="send">
          <IoIosAttach />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <CiImageOn />
          </label>
          <button>send</button>
        </div>
      </div>
    </>
  );
};

export default TextInput;
