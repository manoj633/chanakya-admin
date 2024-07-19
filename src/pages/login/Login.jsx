import React, { useState } from "react";
import "./login.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <div className="login">
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button>Login</button>
      </div>
    </>
  );
};

export default Login;
