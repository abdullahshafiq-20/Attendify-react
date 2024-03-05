import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0l_I0Z5B_OUlLvMT1fR9Ycuwg3Ys0fhg",
  authDomain: "blog-react-74910.firebaseapp.com",
  projectId: "blog-react-74910",
  storageBucket: "blog-react-74910.appspot.com",
  messagingSenderId: "851168048260",
  appId: "1:851168048260:web:bff8e5c69a706181b37ed1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
    app, auth, provider
}