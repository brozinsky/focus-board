const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/api/secure-data", (req, res) => {
  res.json({ message: "Tester" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
