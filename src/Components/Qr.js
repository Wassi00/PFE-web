// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../Constants";
import QRCodeGeneration from "./QRCode";
import { Button, Flowbite, Label, Select } from "flowbite-react";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Qr = ({ token }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(url + `/qr/assignedClasses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data);
      } catch (error) {
        console.log("error fetching classes: " + error);
      }
    };
    fetchClasses();
  }, [token]);

  useEffect(() => {
    if (selectedClass) {
      const fetchModules = async () => {
        try {
          const response = await axios.get(
            `${url}/qr/assigned-modules/${selectedClass}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setModules(response.data);
        } catch (error) {
          console.log("error fetching modules: " + error);
        }
      };
      fetchModules();
    }
  }, [selectedClass, token]);

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div
        className="flex items-center justify-center max-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ minHeight: "100vh", flexDirection: "column", gap: "2rem" }}
      >
        <Header />
        <Button onClick={() => navigate("/main")}>
          <HiOutlineHome className="mr-2 h-5 w-5" />
          Dashbord
        </Button>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-white font-bold mb-10">Générer un Qr code</h1>

          <div className="mb-2 block">
            <Label htmlFor="classes" value="Sélectionner une classe" />
          </div>
          <Select
            id="classes"
            onChange={(e) => setSelectedClass(e.target.value)}
            value={selectedClass}
            required
            className="mb-10"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.code} value={cls.code}>
                {cls.name}
              </option>
            ))}
          </Select>
          {selectedClass && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="modules" value="Sélectionner le module" />
              </div>
              <Select
                id="modules"
                className="mb-10"
                onChange={(e) => setSelectedModule(e.target.value)}
                value={selectedModule}
              >
                <option value="">Select Module</option>
                {modules.map((mod) => (
                  <option key={mod.code} value={mod.code}>
                    {mod.intitule}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {selectedClass && selectedModule && (
            <QRCodeGeneration
              token={token}
              classId={selectedClass}
              moduleId={selectedModule}
            />
          )}
        </div>
        <Button
          color={"failure"}
          className="w-min dark:bg-red-700 dark:text-gray-200"
          onClick={logout}
        >
          <HiOutlineLogout className="mr-2 h-5 w-5" />
          LogOut
        </Button>
      </div>
    </Flowbite>
  );
};

export default Qr;
