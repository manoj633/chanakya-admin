import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res?.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
    }
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
        <button disabled={loading} onClick={handleLogin}>
          Login
        </button>
      </div>
      {error && <span>{error}</span>}
    </>
  );
}

export default Login;
