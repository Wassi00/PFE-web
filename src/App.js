// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import "./App.css";
import { Flowbite } from "flowbite-react";
import Main from "./Components/Main";
import Qr from "./Components/Qr";
import Absence from "./Components/Absence";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Qr" element={<Qr token={token} />} />
          <Route path="/absences" element={<Absence token={token} />} />
        </Routes>
      </Router>
    </Flowbite>
  );
};

export default App;
