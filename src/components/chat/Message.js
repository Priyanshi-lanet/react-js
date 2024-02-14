import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { UserAuth } from "../context/AuthContext";

const Message = ({ messages }) => {
  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://media.istockphoto.com/id/464464860/photo/young-woman-in-graduation-cap-and-gown.webp?s=2048x2048&w=is&k=20&c=2scuNSwaPzj7IHSwc5RSohMRmUOyNo5nps9W4RBcKXg="
          alt=""
        />
        <span>just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src="https://images.unsplash.com/photo-1623461487986-9400110de28e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};

export default Message;
