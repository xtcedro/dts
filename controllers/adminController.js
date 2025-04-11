// /controllers/adminController.js

import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.ADMIN_DB_HOST,
  user: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.ADMIN_DB_NAME,
};

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  const { username, password, siteKey } = req.body;

  if (!siteKey) {
    return res.status(400).json({ error: "Missing site key." });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute(
      "SELECT * FROM admin_users WHERE username = ? AND site_key = ?",
      [username, siteKey]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, siteKey },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
    await db.end();
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/admin/change-password
export const changeAdminPassword = async (req, res) => {
  const { currentPassword, newPassword, siteKey } = req.body;
  const adminId = req.admin?.id;

  if (!adminId || !siteKey) {
    return res.status(400).json({ error: "Missing credentials or site key." });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute(
      "SELECT * FROM admin_users WHERE id = ? AND site_key = ?",
      [adminId, siteKey]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found." });
    }

    const admin = rows[0];
    const match = await bcrypt.compare(currentPassword, admin.password_hash);

    if (!match) {
      return res.status(403).json({ error: "Incorrect current password." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.execute(
      "UPDATE admin_users SET password_hash = ? WHERE id = ? AND site_key = ?",
      [hashedPassword, adminId, siteKey]
    );

    res.status(200).json({ message: "Password changed successfully." });
    await db.end();
  } catch (error) {
    console.error("Change Password Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};