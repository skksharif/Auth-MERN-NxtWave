const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("http://localhost:5000");
})