// Import necessary modules
const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Mock user data
const users = {
  admin: { role: 'Admin' },
  client: { role: 'Client' },
  user: { role: 'User' }
};

// Login route
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (users[username]) {
    req.session.user = users[username];
    res.redirect('/dashboard');
  } else {
    res.send('User not found');
  }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.send('Please login first');
  }
  const role = req.session.user.role;
  res.send(`Welcome ${role}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
