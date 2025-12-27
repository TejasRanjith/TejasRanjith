import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCEkwGwq-U4xzHcs1gL5hjHpQEa6l48BcM",
  authDomain: "portfolio-projects-580c6.firebaseapp.com",
  projectId: "portfolio-projects-580c6",
  storageBucket: "portfolio-projects-580c6.firebasestorage.app",
  messagingSenderId: "419048639250",
  appId: "1:419048639250:web:f0029c3d7f737fa93381cb",
  measurementId: "G-N9D3G353RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
