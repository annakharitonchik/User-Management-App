import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: `Please provide email or password"}` });
  }

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING * ",
    [name, email, hashedPassword],
  );

  const token = generateToken(newUser.rows[0].email);

  return res.status(201).json({ user: newUser.rows[0], token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: `Please provide ${!email ? "email" : "password"}` });
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const userData = user.rows[0];
  if (userData.status === "Blocked") {
    return res.status(403).json({ message: "User blocked" });
  }
  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  await pool.query("UPDATE users SET last_seen = NOW() WHERE email = $1", [
    email,
  ]);
  const token = generateToken(userData.email);

  res.json({
    user: {
      name: userData.name,
      email: userData.email,
      status: userData.status,
      login_at: userData.login_at,
      verified: userData.verified,
    },
    token,
  });
});

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.get("/users", protect, async (req, res) => {
  const users = await pool.query(
    "SELECT * FROM users ORDER BY last_seen DESC NULLS LAST",
  );

  if (users.rows.length === 0) {
    return res.status(404).json({
      message: "Users not found",
    });
  }
  res.json(users.rows);
});
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});
router.patch("/users/block", protect, async (req, res) => {
  const { emails } = req.body;
  await pool.query(
    "UPDATE users SET status = 'Blocked' WHERE email = ANY($1)",
    [emails],
  );
  res.json({ message: "Users blocked" });
});
router.patch("/users/unblock", protect, async (req, res) => {
  const { emails } = req.body;
  await pool.query("UPDATE users SET status = 'Active' WHERE email = ANY($1)", [
    emails,
  ]);
  res.json({ message: "Users unblocked" });
});
router.patch("/users/remove", protect, async (req, res) => {
  const { emails } = req.body;
  await pool.query("DELETE FROM users WHERE email = ANY($1)", [emails]);
  res.json({ message: "Users deleted" });
});
export default router;
