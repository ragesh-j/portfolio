const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Query = require("./models/Query");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

app.post("/api/query", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newQuery = new Query({ name, email, subject, message });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
