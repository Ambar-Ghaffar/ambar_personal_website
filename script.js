let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
}
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post("/send-message", async (req, res) => {
  const { fullName, email, phoneNumber, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "All required fields must be filled!" });
  }

  // Send email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password", // Use environment variables for security
    },
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com", // Replace with your email
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${fullName}
      Email: ${email}
      Phone: ${phoneNumber}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch(e.target.action, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      alert("Your message has been sent!");
      e.target.reset();
    } else {
      alert("Failed to send the message. Please try again later.");
    }
  });
  