const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect MongoDB (use your own MongoDB URI here)
mongoose.connect("mongodb://127.0.0.1:27017/itemManager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// POST Register API
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
