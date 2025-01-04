const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://auth-mern-nxtwave.onrender.com', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    credentials: true, // Include cookies if needed
}));
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.static("routes"))
app.use(express.static("models"))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT || 5000,()=>{
    console.log(process.env.PORT);
})
