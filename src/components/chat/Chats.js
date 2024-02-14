import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { getChatdata } from "../store/actions/chat";

const Chats = () => {
  const dispatch = useDispatch();
  const [user, setuser] = useState([]);
  useEffect(() => {
    let records = [];
    console.log("insideeee");
    const usersRef = ref(database, "userChats");
    onValue(
      usersRef,
      (snapshot) => {
        console.log("snapshot", snapshot); // Corrected to log the snapshot

        snapshot.forEach((element) => {
          let data = element.val();
          records.push({ data: data });
        });
        setuser(records);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    console.log("records", JSON.stringify(records, null, 2));
  }, [database]);
  const handleSelect = (params) => {
    console.log("params", params);
    dispatch(getChatdata(params));
  };
  console.log("user", user);
  return (
    <div>
      {user.map(
        (record, index) =>
          record.data.userInfo && (
            <div
              className="userChat"
              key={index}
              onClick={() => handleSelect(record)}
            >
              <img src={record.data.userInfo.profile} alt="" />
              <div className="userChatInfo">
                <span>{record.data.userInfo.name}</span>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Chats;
