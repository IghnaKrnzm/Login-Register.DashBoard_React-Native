import React, { useState } from 'react';
import LoginScreen from './Loginscreen';
import DashboardApp from './DashboardApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    <DashboardApp userEmail={userEmail} onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
