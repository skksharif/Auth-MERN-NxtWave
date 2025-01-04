import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/api";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const imageName = user?.profileImage.replace("uploads\\", "");

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/delete-account/${user._id}`);
        alert("Thank You for Using Our Service!"+response.data.msg);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully...")
    navigate("/");
  };

  if(localStorage.getItem("token")){
    return (
        <div style={{
            backgroundColor:"white",
            padding:"30px 50px",
            borderRadius:"10px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
          <img
            src={`https://auth-mern-nxtwave.onrender.com/api/auth/${imageName}`}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h1>Welcome, {user?.username}!</h1>
          <p>Email: {user?.email}</p>
          <p>Age: {user?.age}</p>
          <p>Date of Birth: {new Date(user?.dob).toLocaleDateString()}</p>
    
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleDeleteAccount}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                marginRight: "10px",
                borderRadius: "5px",
              }}
            >
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              style={{
                marginTop:"20px",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      );
  }
  return(
    <>
      <center><h1>Not Authorized...</h1></center>
    </>
  )


};

export default Home;
