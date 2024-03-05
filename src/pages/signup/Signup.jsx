import React from "react";
import styles from "./style.module.css";
import { FaGoogle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";


export const Signup = () => {
  return (
    <>
      <div className={styles.containerlogin}>
        {/* <div className={styles.page1}>
          <h1>Attendify.</h1>
          <p>Count you students In, Not out.</p>
        </div> */}
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>
              Create your <span>Attendify</span> account
            </h2>
            <p>Enter your information below to create your account</p>
            <div className={styles.difauth}>
              <button>
                <FaGoogle />
                Google
              </button>
              <button>
                <FaGoogle />
                Google
              </button>
            </div>
            -or-
            <div className={styles.inputfield}>
              <p>Your name</p>
              <input type="text" placeholder="eg:abdullah20" />
            </div>
            <div className={styles.inputfield}>
              <p>Your email</p>
              <input type="text" placeholder="m@example.com" />
            </div>
            <div className={styles.inputfield}>
              <p>Set your password</p>
              <input type="password" />
            </div>
            <div className={styles.submitbtn}>
              <button>Signup</button>
            </div>
            <div className={styles.haveanAcount}>
              <p>Already have an account? <RouterLink to="/">Login</RouterLink></p>
            </div>
          </div>
          
        </div>
        
      </div>
    </>
  );
};
