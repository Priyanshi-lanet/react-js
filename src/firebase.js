import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArs41EoPs4NYy_b3X462AbWnh_DOv0xnA",
  authDomain: "fir-project-f7ce8.firebaseapp.com",
  databaseURL: "https://fir-project-f7ce8-default-rtdb.firebaseio.com",
  projectId: "fir-project-f7ce8",
  storageBucket: "fir-project-f7ce8.appspot.com",
  messagingSenderId: "487269630778",
  appId: "1:487269630778:web:d88b598c1f612575fc0603",
  measurementId: "G-79QW440M8W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app, firebaseConfig };
