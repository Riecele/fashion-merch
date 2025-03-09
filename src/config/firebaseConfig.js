import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXlEtw3tWvejYvW847AnNh1W4AYcT7nm0",
  authDomain: "ecomm-29c12.firebaseapp.com",
  projectId: "ecomm-29c12",
  storageBucket: "ecomm-29c12.firebasestorage.app",
  messagingSenderId: "369202030295",
  appId: "1:369202030295:web:a9fd7dcd5d547de9b2f292",
  measurementId: "G-N07WRG5PJM"
  };

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Set persistence to LOCAL by default
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });