// server/server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// enable CORS
app.use(cors());

// serve static files from parent folder (lab7)
app.use(express.static(path.join(__dirname, "..")));

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Dice endpoint
app.get("/roll-dices", (req, res) => {
  const dice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  res.json({ dice });
});

app.listen(PORT, () => {
  console.log(`Yatzy Dice Server running at http://localhost:${PORT}`);
});
