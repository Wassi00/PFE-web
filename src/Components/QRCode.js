import React, { useState } from 'react';
import axios from 'axios';
import url from '../Constants';

const QRCodeGeneration = ({ token, classId }) => {
  const [qrCode, setQRCode] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await axios.post(url + '/generate-qr', { classId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQRCode(response.data.qrCode);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  return (
    <div>
      <h1>Generate QR Code for Session</h1>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGeneration;
