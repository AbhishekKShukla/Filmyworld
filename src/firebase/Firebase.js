// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import App from "../App";
import {getFirestore,collection} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIbilc_r_8YhfC5aoTSC0X-6BqJdQ2A-8",
  authDomain: "filmyduniya-79485.firebaseapp.com",
  projectId: "filmyduniya-79485",
  storageBucket: "filmyduniya-79485.appspot.com",
  messagingSenderId: "799159957599",
  appId: "1:799159957599:web:3b2b619f7ac948ef7a43ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"Movie");
export const reviewsRef=collection(db,"reviews")
export const usersRef = collection(db, "users");
export default app;