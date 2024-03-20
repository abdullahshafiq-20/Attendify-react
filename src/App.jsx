import { useState } from "react";
import "./App.css";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup/Signup";
import { AdminLogin } from "./pages/Admin/Login/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import AuthRoute from "./Routes/AuthRoute/AuthRoute";
import AdminProtectedRoute, {
  StdProtectedRoute,
} from "./Routes/ProtectedRoute/ProtectedRoute";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Attendence } from "./pages/Attendence/Attendence";
import { Marks } from "./pages/Marks/Marks";
import { Students } from "./pages/Admin/Students/Students";
import { NewStudent } from "./pages/Admin/NewStudent/NewStudent";
import { Portal } from "./Portal/Portal";

function App() {
  const [response, setResponse] = useState({});

  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Login setResponse={setResponse}/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/Dashboard" element={<Dashboard response={response} />} />
          <Route path="/Attendence" element={<Attendence setResponse={setResponse} />} />
          <Route path="/Marks" element={<Marks />} />

        </Routes>
      </Router> */}
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Login setResponse={setResponse} />} />
            <Route path="/adminlogin" element={<AdminLogin setResponse={setResponse} />} />
            
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route
              path="/Dashboard"
              element={<Dashboard response={response} />}
            />
            <Route
              path="/Students"
              element={<Students setResponse={setResponse} />}
            />
             <Route
              path="/NewStudent"
              element={<NewStudent setResponse={setResponse} />}
            />
              <Route
              path="/AllStudents"
              element={<Students setResponse={setResponse} />}
            />
          </Route>

          <Route element={<StdProtectedRoute/>}>
          <Route path="/Portal" element={<Portal />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
