import { firebase, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjy0ejw6KssuvqhQBzmt7zWWZjCrLGApg",
  authDomain: "reactjs-834f1.firebaseapp.com",
  projectId: "reactjs-834f1",
  storageBucket: "reactjs-834f1.appspot.com",
  messagingSenderId: "403700375139",
  appId: "1:403700375139:web:67c13f326f22bef18f6256",
  measurementId: "G-N62RNFXHEP",
  databaseURL: "https://reactjs-834f1-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
export { auth, app, firebaseConfig, database, storage };
