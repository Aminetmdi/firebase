import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6uY7_uuia9COTz8xMN_XFsHhg9HEK8x8",
  authDomain: "fir-course-1fd46.firebaseapp.com",
  projectId: "fir-course-1fd46",
  storageBucket: "fir-course-1fd46.appspot.com",
  messagingSenderId: "59935253923",
  appId: "1:59935253923:web:19f6dccf27cb4c62d86616",
  measurementId: "G-1VP52T3RZ7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
