import React, { useState } from "react";
import "./ChatScreen.css";
import { IoIosAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { UserAuth } from "../context/AuthContext";
import { ref, update, onValue, set } from "firebase/database";
import { database } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
const TextInput = () => {
  const [text, settext] = useState("");
  const [image, setimage] = useState("");
  const data = useSelector((state) => state.chat.chatId);
  console.log("data", data);
  const { user } = UserAuth();
  console.log("user", user);
  const handleClick = () => {
    if (image) {
    } else {
      const newMessage = {
        id: uuidv4(),
        text: text,
        senderId: user.uid,
        date: new Date().toISOString(), // Or use any appropriate format
      };
      const userRef = ref(database, "chats" + data).push(newMessage);
      // userRef
      //   .get()
      //   .then((snapshot) => {
      //     if (snapshot.exists()) {
      //       const grpArray = snapshot.val();
      //       grpArray.push(newMessage);
      //       userRef.set(grpArray);
      //     } else {
      //       userRef.set({ 0: "Elem#1" });
      //     }
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });
      // const newPostRef = userRef.push();
      // newPostRef.set(newMessage);

      // onValue(
      //   userRef,
      //   (snapshot) => {
      //     let message = snapshot.val() || {}; // Use {} for object instead of []

      //     // Merge the existing message with new data
      //     let updatedMessage = {
      //       ...message, // Spread operator to merge existing data
      //       ...newMessage, // Add new data here
      //     };

      //     set(userRef, updatedMessage)
      //       .then(() => {
      //         console.log("Data updated successfully!");
      //       })
      //       .catch((error) => {
      //         console.error("Error updating data:", error);
      //       });
      //   },
      //   (error) => {
      //     console.error("Error fetching data:", error);
      //   }
      // );
    }
  };
  return (
    <>
      <div className="input">
        <input
          text="text"
          placeholder="Type Something....."
          onChange={(e) => settext(e.target.value)}
        />
        <div className="send">
          <IoIosAttach />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file" onChange={(e) => setimage(e.target.files[0])}>
            <CiImageOn />
          </label>
          <button onClick={handleClick}>send</button>
        </div>
      </div>
    </>
  );
};

export default TextInput;
