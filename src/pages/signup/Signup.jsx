import React, { useState } from "react";
import styles from "./style.module.css";
import { FaGoogle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const Signup = ( {onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userdata= {name, email, password}
        console.log(userdata);
        onSignup(userdata);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Handle error here or provide user feedback
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user, "user");
        
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle error here or provide user feedback
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.containerlogin}>
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>
              Create your <span>Attendify</span> account
            </h2>
            <p>Enter your information below to create your account</p>
            <div className={styles.difauth}>
              <button onClick={handleGoogleSignIn}>
                <FaGoogle />
                Sign up with Google
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputfield}>
                <p>Your name</p>
                <input
                  type="text"
                  placeholder="eg:abdullah20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <p>Your email</p>
                <input
                  type="text"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <p>Set your password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.submitbtn}>
                <button type="submit">Signup</button>
              </div>
            </form>
            <div className={styles.haveanAcount}>
              <p>
                Already have an account? <RouterLink to="/">Login</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
