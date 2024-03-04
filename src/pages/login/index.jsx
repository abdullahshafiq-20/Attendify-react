import React from 'react'
import styles from "./style.module.css";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  return (
    <>
    <div className={styles.containerlogin}>
    <div className={styles.page1}>
            <h1>Attendify.</h1>
            <p>Count you students In, Not out.</p>
        </div>
        <div className={styles.page2}>
            <div className={styles.loginform}>
                <h2>Login to your account</h2>
                <p>Enter email below to login to your account</p>
                <div className={styles.difauth}>
                    <button><FaGoogle/>Google</button>
                </div>
                <div className={styles.inputfield}>
                    <p>Email</p>
                    <input type="text" placeholder='m@example.com' />
                </div>
                <div className={styles.inputfield}>
                    <p>Password</p>
                    <input type="password" />
                </div>
                <div className={styles.submitbtn}>
                    <button>Login</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
