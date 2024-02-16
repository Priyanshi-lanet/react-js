import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { getChatdata } from "../store/actions/chat";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Chats = () => {
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const [chats, setChats] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    const getChats = async () => {
      try {
        const userChatsRef = doc(db, `usersChats/${user.uid}`);
        const snapshot = await getDoc(userChatsRef);

        if (snapshot.exists()) {
          setChats(snapshot.data());
        } else {
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (user && user.uid) {
      getChats();
    }
  }, [user]);

  const handleSelect = (params) => {
    dispatch(getChatdata(params, user));
  };
  return (
    <div className="chats">
      {Object.keys(chats).map((key) => {
        const user = chats[key];
        const lastMessage = user?.lastMessage?.text || "No messages yet";
        if (
          user.userInfo &&
          user.userInfo.displayName &&
          user.userInfo.photoURL
        ) {
          const { displayName, photoURL } = user.userInfo;

          return (
            <div
              className="userChat"
              key={key}
              onClick={() => handleSelect(user.userInfo)}
            >
              <img src={photoURL} alt={`${displayName}'s Photo`} />
              <div className="userChatInfo">
                <span style={{ fontFamily: "Playfair" }}>{displayName}</span>
                <p>{lastMessage}</p> {/* Display the last message */}
              </div>
            </div>
          );
        } else {
          return null; // Skip rendering if userInfo or required fields are missing
        }
      })}
    </div>
  );
};

export default Chats;
