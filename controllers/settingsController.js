import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.ADMIN_DB_HOST,
  user: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.ADMIN_DB_NAME,
};

// GET /api/settings
export const getSiteSettings = async (req, res) => {
  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute("SELECT * FROM site_settings LIMIT 1");
    await db.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Settings not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching settings:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/settings
export const updateSiteSettings = async (req, res) => {
  const { siteTitle, contactEmail, businessPhone, homepageBanner } = req.body;

  if (!siteTitle || !contactEmail || !businessPhone || !homepageBanner) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    const [existing] = await db.execute("SELECT id FROM site_settings LIMIT 1");

    if (existing.length === 0) {
      // Insert if no row exists (failsafe)
      await db.execute(
        `INSERT INTO site_settings (site_title, contact_email, business_phone, homepage_banner)
         VALUES (?, ?, ?, ?)`,
        [siteTitle, contactEmail, businessPhone, homepageBanner]
      );
    } else {
      // Update the existing row
      await db.execute(
        `UPDATE site_settings SET
         site_title = ?, contact_email = ?, business_phone = ?, homepage_banner = ?
         WHERE id = ?`,
        [siteTitle, contactEmail, businessPhone, homepageBanner, existing[0].id]
      );
    }

    await db.end();
    res.status(200).json({ message: "Settings updated successfully" });
  } catch (err) {
    console.error("Error updating settings:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};