// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const users = [
    { id: 1, username: 'admin', password: 'adminpass', role: 'Admin' },
    { id: 2, username: 'client', password: 'clientpass', role: 'Client' },
    { id: 3, username: 'user', password: 'userpass', role: 'User' }
];

app.use(bodyParser.json());

// Authentication endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey');
        return res.json({ token });
    }
    return res.status(401).send('Invalid credentials');
});

// Middleware to check role
const authorize = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.sendStatus(403);
        jwt.verify(token, 'secretkey', (err, user) => {
            if (err) return res.sendStatus(403);
            if (roles.length && !roles.includes(user.role)) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    };
};

// Role-based landing pages
app.get('/landing', authorize(), (req, res) => {
    res.send(`Welcome ${req.user.role}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
