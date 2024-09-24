import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login success", response.data);

      const { token, name } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);

      navigate("/admin");
    } catch (error) {
      console.error("Login error", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />{" "}
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />{" "}
        <br />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      <button onClick={() => navigate("/register")} className="button">
        Register
      </button>{" "}
      {/* New Button */}
    </div>
  );
};

export default Login;
