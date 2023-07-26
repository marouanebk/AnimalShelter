import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
const app = initializeApp ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
});
// Firebase storage reference
const storage = getStorage(app);
export default storage;


// Initialize Firebase
// const app = initializeApp(firebaseConfig);