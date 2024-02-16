import React, { useState } from "react";
import "./ChatScreen.css";
import { IoIosAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";

import { UserAuth } from "../context/AuthContext";
import { storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
const TextInput = () => {
  const { user } = UserAuth();
  const db = getFirestore();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const data = useSelector((state) => state.chat);
  const getUrlFromFirebase = async (image) => {
    if (image == null) return; // Check if image is null
    const storageRef = ref(storage, `chatImage/${uuid()}`);
    try {
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (img) {
      console.log("inside");
      const imageUrl = await getUrlFromFirebase(img);
      console.log("image", imageUrl);
      const ChatsRef = doc(db, `chats/${data.chatId}`);
      await updateDoc(ChatsRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
          img: imageUrl,
        }),
      });
    } else {
      const ChatsRef = doc(db, `chats/${data.chatId}`);
      await updateDoc(ChatsRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    const userChatsRef = doc(db, `usersChats/${user.uid}`);
    await updateDoc(userChatsRef, {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    const userrChatsRef = doc(db, `usersChats/${data.user.uid}`);
    await updateDoc(userrChatsRef, {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
          <IoIosAttach />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file" onChange={(e) => setImg(e.target.files[0])}>
            <CiImageOn />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default TextInput;
