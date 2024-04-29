// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-977e6.firebaseapp.com",
  projectId: "mern-estate-977e6",
  storageBucket: "mern-estate-977e6.appspot.com",
  messagingSenderId: "383799406238",
  appId: "1:383799406238:web:472c8ac93ba158b6f7558f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
