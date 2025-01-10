
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmmGsKt9y4SvFHs8Iho90heqtb6ZtfsQA",
  authDomain: "jallikattu-6d5e5.firebaseapp.com",
  projectId: "jallikattu-6d5e5",
  storageBucket: "jallikattu-6d5e5.firebasestorage.app",
  messagingSenderId: "655119091335",
  appId: "1:655119091335:web:c14796b05969597b361a22",
  measurementId: "G-FZ8DPN08VC"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebase = getFirestore(app);