// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async(req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure the transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other email services
    auth: {
      user: 'mowriyaabk@gmail.com',
      pass: process.env.PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'mowriyaabk@gmail.com',
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
