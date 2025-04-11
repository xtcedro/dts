import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

// Change password controller
export const changeAdminPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized request." });
  }

  const token = authHeader.split(" ")[1];
  let admin;

  try {
    admin = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.ADMIN_DB_HOST,
      user: process.env.ADMIN_DB_USER,
      password: process.env.ADMIN_DB_PASSWORD,
      database: process.env.ADMIN_DB_NAME,
    });

    const [rows] = await db.execute("SELECT * FROM admin_users WHERE id = ?", [admin.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Admin not found." });

    const match = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!match) return res.status(400).json({ error: "Current password is incorrect." });

    const newHash = await bcrypt.hash(newPassword, 10);
    await db.execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [newHash, admin.id]);

    await db.end();
    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Password Change Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
};