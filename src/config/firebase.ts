import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Placeholder Firebase config
// Replace with actual keys when setting up Firebase backend
const firebaseConfig = {
  apiKey: "AIzaSyBh95xlW5kBJCIsTGPZmzG-OknMvbITpt4",
  authDomain: "smoke-shop-app-20796.firebaseapp.com",
  projectId: "smoke-shop-app-20796",
  storageBucket: "smoke-shop-app-20796.firebasestorage.app",
  messagingSenderId: "171798240991",
  appId: "1:171798240991:web:7502e7a26fb7088cb1136a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
