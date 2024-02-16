import React, { useEffect, useRef, useState } from "react";
import "./ChatScreen.css";
import { useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { UserAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { user } = UserAuth();
  const ref = useRef();
  const data = useSelector((state) => state.chat.user);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid
              ? user.photoURL
                ? user.photoURL
                : "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
