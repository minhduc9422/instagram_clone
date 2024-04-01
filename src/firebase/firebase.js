import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyLRFq5hWlnXHSAQd3oj5zyYIRD3EdgxQ",
  authDomain: "pmds-insta-clone.firebaseapp.com",
  projectId: "pmds-insta-clone",
  storageBucket: "pmds-insta-clone.appspot.com",
  messagingSenderId: "377841682506",
  appId: "1:377841682506:web:a7c734b90c01953f5bfeb3",
  measurementId: "G-X7N7ENGCDV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
