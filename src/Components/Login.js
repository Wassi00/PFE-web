import React, { useState } from 'react';
import axios from 'axios';
import url from '../Constants';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [cin, setCin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + '/loginProf', { email, cin });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>CIN:</label>
        <input type="password" value={cin} onChange={(e) => setCin(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
