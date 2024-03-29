import React from "react";
import styles from "./style.module.css";
import { FaGoogle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../utils/Toast";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const Login = ({ setResponse }) => {
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
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setResponse(user);
        Toast("Login Successful", "success");
        navigate("/Portal");
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
        Toast(errorMessage, "error");
      });
  };

  const loginHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      console.log("required field are missing");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userID = userCredential.user.uid;
        console.log(userID, "user");
        const userData = await getDoc(doc(db, "users", userID));
        console.log(userData.data(), "userData");
        localStorage.setItem("uid", userID);
        localStorage.setItem("user", JSON.stringify(userData.data()));
        Toast("User login", "success");
        if (userData.type == "admin") {
          navigate("/dashboard");
        } else {
          navigate("/portal");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Toast(errorCode, "error");
      });
  };
  return (
    <>
      <div className={styles.containerlogin}>
        <div className={styles.page1}>
          <h1>Attendify.</h1>
          <p>
            Count your students In, <br />
            Not out.
          </p>
        </div>
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>Login to your account</h2>
            <p>Enter email below to login to your account</p>
            <div className={styles.difauth}>
              <button onClick={handleGoogleSignIn}>
                <FaGoogle />
                Continue with Google
              </button>
            </div>
            <form onSubmit={loginHandler}>
              <div className={styles.inputfield}>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.submitbtn}>
                <button>Login</button>
              </div>
            </form>

            <div className={styles.haveanAcount}>
              <p>
                Are you Admin ? <RouterLink to="/adminlogin">Login</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
