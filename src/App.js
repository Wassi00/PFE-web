import React, { useState } from 'react';
import Login from './Components/Login';
import ClassSelection from './Components/ClassSelection';
import QRCodeGeneration from './Components/QRCode';

const App = () => {
  const [token, setToken] = useState(null);
  const [classId, setClassId] = useState(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (!classId) {
    return <ClassSelection token={token} selectClass={setClassId} />;
  }

  return <QRCodeGeneration token={token} classId={classId} />;
};

export default App;
