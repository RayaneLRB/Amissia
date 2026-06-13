import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0kjMFqqmdTgAto-slm4_m5cvmsAYtV7Y",
  authDomain: "amissia-3ae25.firebaseapp.com",
  projectId: "amissia-3ae25",
  storageBucket: "amissia-3ae25.firebasestorage.app",
  messagingSenderId: "17376721791",
  appId: "1:17376721791:web:745208bb6ae7dda0e3f84a",
  measurementId: "G-NCPX57EHHC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
