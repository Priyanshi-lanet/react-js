import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { set, ref, push } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  function generateRandom5DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
  }

  const createUser = async (email, password, name, image) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userId = user.uid;

      const userData = {
        email: user.email,
        name: name,
        id: userId,
        profile: image,
      };
      const db = getFirestore();

      const userRef = doc(db, "users", userId);
      const message1 = {
        uid: userId,
        id: 1,
      };
      const userChatsRef = doc(db, "usersChats", userId);
      await setDoc(userChatsRef, message1);
      const message = {
        uid: userId,
        name,
        email,
        profile: image,
      };
      await setDoc(userRef, message);
      await set(ref(database, `users/${userId}`), userData);
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      return token;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  };
  const BuildCoalition = async (groupList, name) => {
    console.log("go", groupList);
    console.log("name", name);
    const userId = user.uid;

    try {
      let obj = {
        group_Name: name,
        group_List: groupList,
      };

      const newGroupRef = push(ref(database, `GroupList/${userId}`), obj);
      const newGroupId = newGroupRef.key;

      return newGroupId;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  const forgotPassward = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        forgotPassward,
        BuildCoalition,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
