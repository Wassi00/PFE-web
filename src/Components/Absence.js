import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../Constants";
import { Button, Flowbite, Table } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Absence({ token }) {
  const [absences, setAbsences] = useState([]);
  const [students, setStudents] = useState([]);
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await axios.get(
          url + "/professors/absences/" + decoded.id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAbsences(response.data.absences);
        setStudents(response.data.students);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    fetchAbsences();
  }, [token]);

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "100vh", flexDirection: "column", gap: "2rem" }}
      >
        <Header />
        <Button onClick={() => navigate("/main")}>
          <HiOutlineHome className="mr-2 h-5 w-5" />
          Dashbord
        </Button>
        <Table>
          <Table.Head>
            <Table.HeadCell>Code du module</Table.HeadCell>
            <Table.HeadCell>Nom de l'étudiant</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {absences.map((absence, index) => (
              <React.Fragment key={index}>
                {absence.students.map((absenceStudent) => {
                  const student = students.find(
                    (s) => s.Cin === absenceStudent.studentId
                  );
                  return (
                    <Table.Row
                      key={absenceStudent.studentId} // Assuming studentId is unique for each student
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{absence.moduleCode.moduleCode}</Table.Cell>
                      <Table.Cell>
                        {student
                          ? student.nom + " " + student.prenom
                          : "Unknown"}
                      </Table.Cell>
                      <Table.Cell>
                        {absenceStudent.createdAt.substr(0, 10)}
                      </Table.Cell>
                      {/* Add more cells here for other student data if needed */}
                    </Table.Row>
                  );
                })}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
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
}

export default Absence;
