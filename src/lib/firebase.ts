import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFiodvcdYW82yhf7MmdX4Hoh6QvxlvjlY",
  authDomain: "sayohat1.firebaseapp.com",
  projectId: "sayohat1",
  storageBucket: "sayohat1.appspot.com", // ✅ TO‘G‘RILANDI
  messagingSenderId: "39765986267",
  appId: "1:39765986267:web:65ecf565f3a32654bcb5fe"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
