import React, { useState } from "react";
import { url } from "../App.jsx"; // Ensure this points to your API's base URL

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    console.log(username, password);
    fetch(`${url}/account/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(r => r.json())
    .then(resp => {
      console.log(resp);
      if (!resp.error) {
        // Handle successful login here
        console.log("Login successful", resp);
        // Redirect user, update context/state, etc.
      } else {
        alert(resp.error);
      }
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default Login;