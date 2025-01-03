import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      alert(response.data.msg);
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError(err.response.data.msg || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
      </form>

    </div>
  );
};

export default Login;
