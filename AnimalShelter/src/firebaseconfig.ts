import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
const app = initializeApp ({
  apiKey: "AIzaSyAXyl2is2ImVU2olv3pjq4n2_g6WpqUn-8",
  authDomain: "animalshelter-7d8de.firebaseapp.com",
  projectId: "animalshelter-7d8de",
  storageBucket: "animalshelter-7d8de.appspot.com",
  messagingSenderId: "142623635924",
  appId: "1:142623635924:web:690fd2bf8c13734fa3fe41"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;


// Initialize Firebase
// const app = initializeApp(firebaseConfig);