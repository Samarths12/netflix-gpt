// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdUc0mQ86fJT1GqQKvGGhZ-TWYl2ImiZY",
  authDomain: "netflix-gpt-4a46b.firebaseapp.com",
  projectId: "netflix-gpt-4a46b",
  storageBucket: "netflix-gpt-4a46b.firebasestorage.app",
  messagingSenderId: "1026677074376",
  appId: "1:1026677074376:web:21492464851e7f690578fd",
  measurementId: "G-8SZ1NMPCF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();