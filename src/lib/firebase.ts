// src/firebase/firebase.config.ts

// Firebase App va Firestore ni import qilamiz
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyBFiodvcdYW82yhf7MmdX4Hoh6QvxlvjlY",
  authDomain: "sayohat1.firebaseapp.com",
  projectId: "sayohat1",
  storageBucket: "sayohat1.firebasestorage.app",
  messagingSenderId: "39765986267",
  appId: "1:39765986267:web:65ecf565f3a32654bcb5fe"
};

// Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);

// Firestore bazasini olish
export const db = getFirestore(app);
