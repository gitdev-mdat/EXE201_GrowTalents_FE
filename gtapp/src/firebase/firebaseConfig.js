// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCntoxIU1-vuNaPJnjatRMoxg_VXWHmCTo",
  authDomain: "growtalents-2e2ca.firebaseapp.com",
  projectId: "growtalents-2e2ca",
  storageBucket: "growtalents-2e2ca.firebasestorage.app",
  messagingSenderId: "399482972898",
  appId: "1:399482972898:web:65bc8faf2cbca731ae0cbb",
  measurementId: "G-05YKQKZHE9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
