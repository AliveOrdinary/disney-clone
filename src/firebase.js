import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDq0H2zJ2K4ZCvPpICgG0VPVdchGZiYmC8",
  authDomain: "disney-clone-31bf8.firebaseapp.com",
  projectId: "disney-clone-31bf8",
  storageBucket: "disney-clone-31bf8.appspot.com",
  messagingSenderId: "548494935537",
  appId: "1:548494935537:web:560b4e40b6216988f5b050",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
