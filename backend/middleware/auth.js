import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pool.query(
      "SELECT name, email, status FROM users WHERE email = $1",
      [decoded.email],
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user.rows[0];
    if (req.user.status === "Blocked") {
      return res.status(403).json({ message: "User blocked" });
    }
    await pool.query("UPDATE users SET last_seen = NOW() WHERE email = $1", [
      req.user.email,
    ]);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};
