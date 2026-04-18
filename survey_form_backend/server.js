const express = require("express");
const app = express();

console.log("Starting server...");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST route to handle form submission
app.post("/submit", (req, res) => {
  console.log("Form data received:", req.body);
  
  // Access checkbox array
  const improvements = req.body["improve[]"] || [];
  console.log("Selected improvements:", improvements);
  
  // Log all form data
  console.log("Name:", req.body.name);
  console.log("Email:", req.body.email);
  console.log("Age:", req.body.number);
  console.log("Character:", req.body.character);
  console.log("Work choice:", req.body.choice);
  console.log("Comments:", req.body.comments);
  
  res.send("Form submitted successfully!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});