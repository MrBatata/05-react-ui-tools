import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm0MGVKQNATCN6XzPiAHswWnGSrHLYjtg",
  authDomain: "react-firebase-2-603c7.firebaseapp.com",
  projectId: "react-firebase-2-603c7",
  storageBucket: "react-firebase-2-603c7.appspot.com",
  messagingSenderId: "1052885436020",
  appId: "1:1052885436020:web:9aa97e153ee8e7be91f321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
