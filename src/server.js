const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Parse JSON bodies
app.use(bodyParser.json());

// POST endpoint for registration
app.post('/register', (req, res) => {
  // Assuming req.body contains the registration data
  const userData = req.body;

  // Here you can add code to store the user data in a database, send confirmation emails, etc.

  // Respond with a success message and the received data
  res.status(200).json({
    message: 'Registration successful',
    data: userData
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
