// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, logOut, user }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Assuming setUser is a function that updates the user's state
    setUser(username);
    navigate('/home'); // Redirect to home after login
  };

  const handleLogout = () => {
    logOut();
    navigate('/home'); // Redirect to home after logout
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>You are logged in as {user}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
};

export default Login;