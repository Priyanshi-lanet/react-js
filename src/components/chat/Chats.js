import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";

const Chats = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const usersRef = ref(database, "userChats");
    onValue(usersRef, (snapshot) => {
      console.log("snapShots", usersRef);
      let records = [];
      snapshot.forEach((element) => {
        let data = element.val();
        records.push({ data: data });
      });
      // const filterRecordsByName = (records, name) => {
      //   return records.filter((record) => {
      //     return record.data.name.toLowerCase() === name.toLowerCase();
      //   });
      // };
      // const filteredRecords = filterRecordsByName(records, username);
      setuser(records);
    });
  }, [database]);
  return (
    <>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1619425192860-bd4d99186366?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="userChatInfo">
          <span>jhonika deo</span>
        </div>
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1619425192860-bd4d99186366?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="userChatInfo">
          <span>jhonika deo</span>
        </div>
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1619425192860-bd4d99186366?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="userChatInfo">
          <span>jhonika deo</span>
        </div>
      </div>
    </>
  );
};

export default Chats;
