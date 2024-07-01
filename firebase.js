// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJDXp8833Xo4In-GeAgB581H1MJOb3IXs",
  authDomain: "furniture-54935.firebaseapp.com",
  projectId: "furniture-54935",
  storageBucket: "furniture-54935.appspot.com",
  messagingSenderId: "354851814658",
  appId: "1:354851814658:web:d58f983c979f68c2f2561b",
  measurementId: "G-B2KWBJ9DXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Storage=getStorage(app);

export {Storage};