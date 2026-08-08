import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import ViewProjects from "./pages/ViewProjects";
import TakeoverRequests from "./pages/TakeoverRequests";
import { Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
  axios
    .get("http://localhost:5000/")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  const [darkMode, setDarkMode] = useState(false);
  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: darkMode ? "#1a1a1a" : "#f4f6f9",
      color: darkMode ? "white" : "black",
    }}
  >
    <Navbar />

    <div style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/projects" element={<ViewProjects />} />
      <Route path="/takeover-requests" element={<TakeoverRequests />} />
    </Routes>
  </div>
);
}

export default App;