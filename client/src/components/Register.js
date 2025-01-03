import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    age: "",
    dob: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase || !hasLowerCase) {
      return "Password must contain both uppercase and lowercase letters";
    }
    if (!hasDigits) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate password
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      await axios.post("/register", form);
      alert("Registration successful");
      navigate("/"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response.data.msg || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      <input type="text" name="company" placeholder="Company" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
      <input type="file" name="profileImage" onChange={handleFileChange} />
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </form>
  );
};

export default Register;
