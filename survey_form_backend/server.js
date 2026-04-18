const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

console.log("Starting server...");

// 1. MIDDLEWARE
// Allows frontend to send data to this backend securely
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. MONGODB CONNECTION
// REPLACE THE STRING BELOW WITH THE ONE FROM YOUR NOTEPAD:
const dbURI = "mongodb+srv://tanaysingh2004_db_user:xZjSjcVoEDt1miZt@cluster0.qdxe2x6.mongodb.net/?appName=Cluster0"; 

mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB Database!"))
  .catch((err) => console.log("Error connecting to database:", err));

// 3. DATABASE SCHEMA & MODEL
// This defines the structure of your data so MongoDB knows how to save it
const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  character: String,
  workChoice: String,
  improvements: [String],
  comments: String
});

const Survey = mongoose.model("Survey", surveySchema);

// 4. ROUTES
// POST route to handle form submission
app.post("/submit", async (req, res) => {
  console.log("Form data received:", req.body);
  
  try {
    // Create a new database entry using the incoming form data
    const newSurvey = new Survey({
      name: req.body.name,
      email: req.body.email,
      age: req.body.number,
      character: req.body.character,
      workChoice: req.body.choice,
      improvements: req.body["improve[]"] || [],
      comments: req.body.comments
    });

    // Save it permanently to MongoDB
    await newSurvey.save();
    console.log("Data successfully saved to database!");
    
    // Send a success response back to the frontend
    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.log("Error saving to database:", error);
    res.status(500).send("Error saving data");
  }
});

// 5. SERVER START
// process.env.PORT allows Render to assign a live port, otherwise it uses 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});