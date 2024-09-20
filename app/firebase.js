import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrrrb4W6kfU0z0tmPIMAroWbn5crTh9kk",
  authDomain: "tictactoe-app-ec25b.firebaseapp.com",
  projectId: "tictactoe-app-ec25b",
  storageBucket: "tictactoe-app-ec25b.appspot.com",
  messagingSenderId: "495311792891",
  appId: "1:495311792891:web:02647d913b488bf73b9e5e",
  measurementId: "G-QDWQNHJWRC"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };