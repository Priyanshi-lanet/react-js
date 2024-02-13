import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import Chats from "./Chats";
import { UserAuth } from "../context/AuthContext";
import firebase from "firebase/app";
import "firebase/database";
import { database } from "../../firebase";
import { onValue, ref, set } from "firebase/database";

const Searchbar = () => {
  const { user } = UserAuth();
  const [username, setUsername] = useState("");
  const [userer, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      let records = [];
      snapshot.forEach((element) => {
        let data = element.val();
        records.push({ data: data });
      });
      console.log("inside Search", records);
      const filterRecordsByName = (records, name) => {
        return records.filter((record) => {
          return record.data.name.toLowerCase() === name.toLowerCase();
        });
      };
      const filteredRecords = filterRecordsByName(records, username);
      setUser(username?.length ? filteredRecords : records);
    });
  }, [database, username]);

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
  const handleSelect = async (currentUser) => {
    const combinedId =
      currentUser.data.id > user.uid
        ? currentUser.data.id + user.uid
        : user.uid + currentUser.data.id;
    try {
      const chatRef = ref(database, "chats/" + combinedId);
      onValue(chatRef, async (snapshot) => {
        if (!snapshot.exists()) {
          await set(ref(database, "chats/" + combinedId), {
            message: ["text"],
          });
          await set(ref(database, "userChats/" + combinedId), {
            userInfo: {
              id: currentUser.data.id,
              name: currentUser.data.name,
              profile: currentUser.data.profile,
            },
            date: new Date().toISOString(),
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
    // setUser(null);
    // setUsername("");
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
      {userer &&
        userer.map((userDetails, index) => (
          <div
            key={index}
            className="userChat"
            onClick={() => {
              handleSelect(userDetails);
            }}
          >
            <img src={userDetails.data.profile} alt="" />
            <div className="userChatInfo">
              <span>{userDetails.data.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Searchbar;
