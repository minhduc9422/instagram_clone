import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVnI6OtHQupV6eAHuStKfcbUWBP7iMv0E",
  authDomain: "pmds-instagram-clone.firebaseapp.com",
  projectId: "pmds-instagram-clone",
  storageBucket: "pmds-instagram-clone.appspot.com",
  messagingSenderId: "985219033766",
  appId: "1:985219033766:web:3b8d540fad27826d63e267",
  measurementId: "G-CHWK0VXV3Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, provider, db as db, storage };
