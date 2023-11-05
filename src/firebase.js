// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage, ref} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD3UYH_t2iwgJ6dBHHO2UGHS8hAP1D9EOQ",
  authDomain: "contact-mgt-with-img.firebaseapp.com",
  projectId: "contact-mgt-with-img",
  storageBucket: "contact-mgt-with-img.appspot.com",
  messagingSenderId: "454675901917",
  appId: "1:454675901917:web:ad0f24f405dbcf1b75da34",
  measurementId: "G-Y7CBYMW7RZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const db =  getFirestore(app)
export const auth= getAuth();

