import React from "react";
import "./ChatScreen.css";
const TextInput = () => {
  return (
    <>
      <div className="input">
        <input text="text" placeholder="Type Something....." />
        <div className="send">
          <img></img>
        </div>
      </div>
    </>
  );
};

export default TextInput;
