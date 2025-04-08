const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Query = require("./models/Query");

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://ragesh-portfolio.vercel.app/',
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

app.post("/api/query", async (req, res) => {
  const { firstName, lastName, email, subject } = req.body;
  try {
    if (!firstName || !lastName || !email || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = new Query({ firstName, lastName, email, subject });
    await query.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
