import React, { useState } from "react";
import axios from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/verify-otp", { email, otp });
      alert(response.data.msg);
      localStorage.setItem("token",response.data.token);
      // Navigate to Home component
      navigate("/home", { state: { user: response.data.userDetails } });
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyOtp;
