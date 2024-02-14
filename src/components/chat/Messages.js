import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
const Messages = () => {
  const [messages, setmessages] = useState([]);
  const data = useSelector((state) => state.chat.chatId);
  useEffect(() => {
    let records = [];

    const usersRef = ref(database, "chats");
    onValue(
      usersRef,
      (snapshot) => {
        console.log("message", snapshot); // Corrected to log the snapshot

        snapshot.forEach((element) => {
          let data = element.val();
          records.push({ data: data });
        });
        setmessages(records);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    console.log("records", JSON.stringify(records, null, 2));
  }, [data]);
  return (
    <div className="messages">
      {messages.map((m) => {
        console.log("m", m);
        <Message messages={m.data} />;
      })}
    </div>
  );
};

export default Messages;
