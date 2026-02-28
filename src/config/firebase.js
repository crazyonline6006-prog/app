import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBh95xlW5kBJCIsTGPZmzG-OknMvbITpt4",
    authDomain: "smoke-shop-app-20796.firebaseapp.com",
    projectId: "smoke-shop-app-20796",
    storageBucket: "smoke-shop-app-20796.firebasestorage.app",
    messagingSenderId: "171798240991",
    appId: "1:171798240991:web:7502e7a26fb7088cb1136a"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
} catch (e) {
    auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
