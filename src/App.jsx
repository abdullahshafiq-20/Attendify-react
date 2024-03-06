import { useState } from "react";
import "./App.css";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
  const [response, setResponse] = useState({});
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setResponse={setResponse}/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard response={response} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
