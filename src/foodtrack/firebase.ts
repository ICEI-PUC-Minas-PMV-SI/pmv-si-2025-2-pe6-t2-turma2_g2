// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw2VwhygjwlWpXuP_7pi71kvLdCgdg3Gs",
  authDomain: "foodtrack-bc321.firebaseapp.com",
  projectId: "foodtrack-bc321",
  storageBucket: "foodtrack-bc321.firebasestorage.app",
  messagingSenderId: "844237723104",
  appId: "1:844237723104:web:f430282b95c840b7608785",
  measurementId: "G-06RTZ0YK0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);