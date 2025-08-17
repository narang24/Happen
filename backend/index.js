require("dotenv").config();
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const path = require('path');
const multer = require('multer');

const app = express();

app.use(express.json())

//Middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`})
});

connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/event',eventRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));