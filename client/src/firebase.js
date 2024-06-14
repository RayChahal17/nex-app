// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: "nex-renovations.firebaseapp.com",
   projectId: "nex-renovations",
   storageBucket: "nex-renovations.appspot.com",
   messagingSenderId: "61410297505",
   appId: "1:61410297505:web:5bd38c47a0ea57383952e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);