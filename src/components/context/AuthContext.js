import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { set, ref } from "firebase/database";

// import { doc, setDoc } from "firebase/firestore";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  function generateRandom5DigitNumber() {
    // Generate a random number between 10000 and 99999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
  }

  const createUser = async (email, password, name, image) => {
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Get the user token
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userId = user.uid;

      const userData = {
        email: user.email,
        name: name,
        id: userId,
        profile: image,
      };
      const random5DigitNumber = generateRandom5DigitNumber();
      // await setDoc(doc(firStore, "users", user.uid), {
      //   email: user.email,
      //   name: name,
      //   id: userId,
      //   profile: image,
      // });

      // //create empty user chats on firestore
      // await setDoc(doc(firStore, "userChats", user.uid), {});
      // navigate("/");
      await set(ref(database, `users/${userId}`), userData);
      await set(ref(database, `userChats/${userId}`), {
        id: random5DigitNumber,
      });
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      return token;
    } catch (error) {
      // Handle errors
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
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, forgotPassward }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
