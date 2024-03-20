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
import { auth, provider,db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../../utils/Toast";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AdminLogin = ({ setResponse }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", { email, password });
   
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userID = userCredential.user.uid;
      console.log(userID, "user")
      const userData = await getDoc(doc(db, "users", userID))
      console.log(userData.data(), "userData")
      localStorage.setItem("uid", userID);
      localStorage.setItem("user", JSON.stringify(userData.data()));
      Toast("user login", "success");
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
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     console.log(user.uid, "user");
    //     const obj = {
    //       name: "Super Admin",
    //       email,
    //       password,
    //       type: "admin", //admin | std
    //     };

    //     const createUser = await setDoc(doc(db, "users", user.uid), obj);

    //     console.log("createUser", createUser);

    //     // ToastAlert("Successfully signup", "success");
    //     // navigate("/");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     Toast(errorMessage, "error");
    //     // ..
    //   });

    // console.log("email,password", email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className={styles.containerlogin}>
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>
              Hello, <span>Attendify</span> Admin
            </h2>
            <p>Enter your information below to login your account</p>
            <div className={styles.difauth}>
              <button onClick={handleGoogleSignIn}>
                <FaGoogle />
                Continue with Google
              </button>
            </div>
            <form onSubmit={handleSubmit}>
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
                Are you student ? <RouterLink to="/">Login</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
