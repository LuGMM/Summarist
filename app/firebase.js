// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl9_TW8sVJecgQEIi0TNyKq0WWL9eF2aA",
  authDomain: "advanced-internship-luis.firebaseapp.com",
  projectId: "advanced-internship-luis",
  storageBucket: "advanced-internship-luis.firebasestorage.app",
  messagingSenderId: "638200837009",
  appId: "1:638200837009:web:83efeeb48e65d9a7f5a030",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
  return app;
};

export const db = getFirestore(app);
