require("dotenv").config();
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const invitationRoutes = require('./routes/invitationRoutes')
const path = require('path');
const multer = require('multer');
const cron = require('node-cron');
const sendReminders = require("./helpers/sendReminders");

const app = express();

app.use(express.json())

// Middleware to handle CORS
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);

        // Allow localhost origins on any port
        if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);

        // Allow all Vercel deployment URLs (production and preview)
        if (/\.vercel\.app$/.test(origin)) return callback(null, true);

        // Allow explicitly configured CLIENT_URL (with or without trailing slash)
        if (process.env.CLIENT_URL) {
            const cleanClientUrl = process.env.CLIENT_URL.replace(/\/$/, '');
            if (origin === cleanClientUrl || process.env.CLIENT_URL === '*') {
                return callback(null, true);
            }
        }

        // Allow the origin
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

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
    res.json({ message: 'File uploaded successfully', fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` })
});

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/invitation', invitationRoutes);

cron.schedule("18 18 * * *", () => {
    sendReminders();
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));