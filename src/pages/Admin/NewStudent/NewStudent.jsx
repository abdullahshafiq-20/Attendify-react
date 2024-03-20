import React from "react";
import { useState, useEffect, onRefresh } from "react";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../../../ui/sidebar/Sidebar";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./NewStudent.module.css";
import { FiUpload } from "react-icons/fi";
import { uploadFile } from "../../../utils/upload";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Toast } from "../../../utils/Toast";


export const NewStudent = ({ response }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Check if user data exists in local storage
    const data = window.localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }

    // If user data is updated, update local storage
    if (response && Object.keys(response).length !== 0) {
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));
    }
  }, [response]);

  //   console.log("user", user);

  const [fullname, setfullname] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("No file selected");
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setFileName(
      selectedFile ? `Selected File: ${selectedFile.name}` : "No file selected"
    );
    setPreviewImage(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleAddStudent = async (e) => {
    try {
        e.preventDefault(); 
      // console.log("handleAddStd",
      //   fullname,
      //   course,
      //   email,
      //   password,
      // )
      if (!fullname || !course || !email || !password) {
        Toast("Required fields are missing", "error");
        return;
      }

      //AUTH
      const stdData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userID = stdData.user.uid;

      // Image
      const imageURL = await uploadFile(image);

      const obj = {
        email,
        name: fullname,
        type: "std",
        course,
        imageURL,
      };

      await setDoc(doc(db, "users", userID), obj);
      Toast("Record Added Succesfully!", "success");
    } catch (error) {
      Toast(error.code || error.message, "error");
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar user={user}>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <SidebarItem
            icon={<StickyNote size={20} />}
            text="New Student"
            alert
            active
          />
          <SidebarItem icon={<Calendar size={20} />} text="AllStudents" />
          {/* <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3 " />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
        </Sidebar>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.nav}>
              <h1>Add new student</h1>
              <hr />
            </div>
            <div className={styles.record}>
              <form action="">
                <div className={styles.inputfield}>
                  <p>Name *</p>
                  <input
                    type="text"
                    placeholder="eg:abdullah20"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                  />
                </div>
                <div className={styles.inputfield}>
                  <p>Course *</p>
                  <input
                    type="text"
                    placeholder="eg:abdullah20"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
                <div className={styles.inputfield}>
                  <p>Email *</p>
                  <input
                    type="text"
                    placeholder="eg:abdullah20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputfield}>
                  <p>Set a Password *</p>
                  <input
                    type="password"
                    placeholder="eg:abdullah20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.uploadbtn}>
                  <label htmlFor="file-input">
                    <FiUpload color="white" size={25} />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.fileDisplay}>{fileName}</div>
                {previewImage && (
                  <div className={styles.imagePreview}>
                    <img src={previewImage} alt="Preview" />
                  </div>
                )}
                <div className={styles.submitbtn}>
                  <button onClick={handleAddStudent}>Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
