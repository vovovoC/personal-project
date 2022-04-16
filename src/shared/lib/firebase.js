import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_KEY,
  messagingSenderId: "734858817502",
  appId: "1:734858817502:web:564c7389ccf99fcb9cb74f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
