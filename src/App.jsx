import { useState } from "react";
import "./App.css";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Home2 } from "./pages/Home/Home2";
import { Projects } from "./pages/Projects/Projects";

function App() {
  const [response, setResponse] = useState({});
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setResponse={setResponse}/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard response={response} />} />
          <Route path="/Home" element={<Home2 />} />
          <Route path="/Projects" element={<Projects />} />

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
