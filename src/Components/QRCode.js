import React, { useState } from "react";
import axios from "axios";
import url from "../Constants";
import { Button } from "flowbite-react";
import Modal from "react-modal";

const QRCodeGeneration = ({ token, classId, moduleId }) => {
  const [qrCode, setQRCode] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        url + "/generate-qr",
        { classId, moduleId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQRCode(response.data.qrCode);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <h1>Générer QR code de la séance</h1>
      <Button style={{ marginBottom: "2vh" }} onClick={generateQRCode}>
        Générer QR Code
      </Button>
      {qrCode && (
        <>
          <img
            src={qrCode}
            alt="QR Code"
            style={{ cursor: "pointer" }}
            onClick={openModal}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="QR Code Modal"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                width: "40vw", // Adjust width
                height: "60vh", // Ensure content is scrollable if it overflows
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <img
              src={qrCode}
              alt="QR Code"
              style={{ width: "100%", height: "90%" }}
            />
            <Button onClick={closeModal}>Close</Button>
          </Modal>
        </>
      )}
    </div>
  );
};

export default QRCodeGeneration;
