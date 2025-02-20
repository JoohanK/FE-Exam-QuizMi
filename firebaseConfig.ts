import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc5J7qcj6Z_o3Ge-bPrg79dKmDs9iJfOY",
  authDomain: "quismi-auth.firebaseapp.com",
  projectId: "quismi-auth",
  storageBucket: "quismi-auth.firebasestorage.app",
  messagingSenderId: "150781469992",
  appId: "1:150781469992:web:3ea5638932f9f38b33dc1d",
  measurementId: "G-PPSSR4HQW7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
