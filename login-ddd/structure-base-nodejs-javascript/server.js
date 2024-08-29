const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).send('Invalid credentials');
    }

    const token = generateToken(user);
    res.json({ token });
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Protected route example
app.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

// Register route (for demo purposes)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User registered' });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});