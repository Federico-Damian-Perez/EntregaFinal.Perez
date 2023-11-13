import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "coder-43255.firebaseapp.com",
  projectId: "coder-43255",
  storageBucket: "coder-43255.appspot.com",
  messagingSenderId: "413593646057",
  appId: "1:413593646057:web:65ae5486ebbf291cffd178"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

