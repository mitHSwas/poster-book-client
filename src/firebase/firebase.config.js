// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAp4appK_BJPUUgvw7x5fEOem807CKGp08",
    authDomain: "poster-book.firebaseapp.com",
    projectId: "poster-book",
    storageBucket: "poster-book.appspot.com",
    messagingSenderId: "643028610321",
    appId: "1:643028610321:web:07ff7b7fe4c15f73ad70b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;