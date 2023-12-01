
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";    
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5D1Oo52sEL0sFB2IP1Tfr_YNWkO4krDk",
  authDomain: "connectify-2e013.firebaseapp.com",
  projectId: "connectify-2e013",
  storageBucket: "connectify-2e013.appspot.com",
  messagingSenderId: "705668538609",
  appId: "1:705668538609:web:a93ccd3ddae90b13cbc950"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();