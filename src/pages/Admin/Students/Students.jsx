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

import styles from "./Students.module.css";

export const Students = ({ response }) => {
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
          {/* <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3 " />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
        </Sidebar>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.nav}>
              <h1>All Students</h1>
              <hr />
            </div>
            <div className={styles.record}>
              <table>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/blog-react-74910.appspot.com/o/images%2FAbdullah%20pic%20ps-rsized.png?alt=media&token=f7ec16bc-a119-4f2f-b635-5536ee58b7e5"
                      alt=""
                    />
                  </td>
                  <td>Abdullah Shafiq</td>
                  <td>Web and app</td>
                  <td>as053266@gmail.com</td>
                  <td>1234567</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/blog-react-74910.appspot.com/o/images%2FAbdullah%20pic%20ps-rsized.png?alt=media&token=f7ec16bc-a119-4f2f-b635-5536ee58b7e5"
                      alt=""
                    />
                  </td>
                  <td>Abdullah Shafiq</td>
                  <td>Web and app</td>
                  <td>as053266@gmail.com</td>
                  <td>1234567</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
