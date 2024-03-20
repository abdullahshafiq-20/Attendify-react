import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import your Firebase configuration
import { getDocs, collection } from "firebase/firestore";
import { LayoutDashboard, StickyNote, Calendar } from "lucide-react";
import Sidebar, { SidebarItem } from "../../../ui/sidebar/Sidebar";


import styles from "./Students.module.css";

export const Students = ({ response }) => {
  const [user, setUser] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const studentsCollection = collection(db, "users");
      const data = await getDocs(studentsCollection);
      const fetchedStudents = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(fetchedStudents);
    };

    fetchData();
  }, []);

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

  return (
    <>
      <div className="flex">
        <Sidebar user={user}>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <SidebarItem
            icon={<StickyNote size={20} />}
            text="NewStudent"
            alert
          />
          <SidebarItem
            icon={<Calendar size={20} />}
            text="AllStudents"
            active
          />
        </Sidebar>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.nav}>
              <h1>All Students</h1>
              <hr />
            </div>
            <div className={styles.record}>
              <table>
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <img src={student.imageURL} alt="" />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{student.email}</td>
                      <td>{student.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
