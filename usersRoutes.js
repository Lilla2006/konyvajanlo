import express from "express";
import bcrypt from "bcrypt";
import { saveUser, getUserByEmail } from "../data/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Hiányzó adatok" });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: "Ezzel az emaillel már van regisztráció" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = saveUser(username || null, email, password_hash);

    return res.json({
      success: true,
      message: "Sikeres regisztráció",
      userId: result.lastInsertRowid
    });
  } catch (err) {
    console.error("Hiba /api/register:", err);
    return res.status(500).json({ success: false, message: "Szerver hiba" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Hiányzó adatok" });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: "Hibás email vagy jelszó" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ success: false, message: "Hibás email vagy jelszó" });
    }

    return res.json({
      success: true,
      message: "Sikeres bejelentkezés",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Hiba /api/login:", err);
    return res.status(500).json({ success: false, message: "Szerver hiba" });
  }
});

app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
