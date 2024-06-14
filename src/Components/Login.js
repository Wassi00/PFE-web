// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../Constants";
import {
  Button,
  DarkThemeToggle,
  Flowbite,
  Label,
  TextInput,
} from "flowbite-react";
import logo from "../images/logo.png";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/loginProf", { email, cin });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/main"); // Navigate to the dashboard after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "100vh", flexDirection: "column", gap: "2rem" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "12rem", height: "10rem" }}
        />
        <h1>Login Professeur</h1>
        <DarkThemeToggle />

        <form
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Label
              htmlFor="email"
              value="Email"
              className="dark:text-gray-200"
            />
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="cin" value="CIN" className="dark:text-gray-200" />
            <TextInput
              id="cin"
              type="text"
              placeholder="cin"
              required
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <Button
            className="w-full dark:bg-blue-700 dark:text-gray-200"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </Flowbite>
  );
};

export default Login;
