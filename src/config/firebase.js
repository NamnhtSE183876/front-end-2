// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { GoogleAuthProvider } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: "AIzaSyBlGL4qCxdt1O9ZFVTt52pscyY4nqI4gHA",
    authDomain: "student-management-41928.firebaseapp.com",
    projectId: "student-management-41928",
    storageBucket: "student-management-41928.appspot.com",
    messagingSenderId: "253865371368",
    appId: "1:253865371368:web:fb4826f10aac328fe2cb5d",
    measurementId: "G-T7MKB6N6TF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, googleProvider };
