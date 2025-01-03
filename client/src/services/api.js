import axios from "axios";

const instance = axios.create({
  baseURL: "https://auth-mern-nxtwave.onrender.com/api/auth", // Replace with your backend URL
});

export default instance;
