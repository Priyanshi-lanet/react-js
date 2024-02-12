import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import Chats from "./Chats";
import { UserAuth } from "../context/AuthContext";
import firebase from "firebase/app";
import "firebase/database";
import { database } from "../../firebase";

const Searchbar = () => {
  const { user } = UserAuth();
  const [username, setUsername] = useState("");
  const [userer, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database
          .ref("users")
          .orderByChild("displayName")
          .equalTo(username)
          .once("value");
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            setUser(childSnapshot.val());
          });
        } else {
          setUser(null);
          setErr(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErr(true);
      }
    };

    if (username !== "") {
      fetchData();
    }
  }, [username]);

  const handleKey = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (username.trim() !== "") {
      setUsername(username.trim());
    }
  };

  const handleSelect = () => {
    // Define your handleSelect logic here
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {userer && (
        <div className="userChat" onClick={handleSelect}>
          <img src={userer.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{userer.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
