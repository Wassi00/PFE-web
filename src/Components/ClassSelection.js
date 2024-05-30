import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../Constants';

const ClassSelection = ({ token, selectClass }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(url + '/classes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClasses(response.data);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };
    fetchClasses();
  }, [token]);

  return (
    <div>
      <h1>Select a Class</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id} onClick={() => selectClass(cls._id)}>{cls.className}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassSelection;
