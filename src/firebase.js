// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBphB9_OqmAnQ7isxX7jNRKaFavYaGF9E",
  authDomain: "transactionapp-24ce1.firebaseapp.com",
  projectId: "transactionapp-24ce1",
  storageBucket: "transactionapp-24ce1.appspot.com",
  messagingSenderId: "366805907891",
  appId: "1:366805907891:web:b4a8bace05d72f40ec73c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();