import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.ADMIN_DB_HOST,
  user: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.ADMIN_DB_NAME,
};

// GET /api/blogs
export const getAllBlogs = async (req, res) => {
  console.log("📥 GET /api/blogs hit");

  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute("SELECT * FROM blogs ORDER BY created_at DESC");
    await db.end();

    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/blogs
export const createBlogPost = async (req, res) => {
  console.log("🛠️ POST /api/blogs hit");
  console.log("📝 Payload:", req.body);

  const { title, author, summary, content } = req.body;

  if (!title || !author || !summary || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    await db.execute(
      `INSERT INTO blogs (title, author, summary, content)
       VALUES (?, ?, ?, ?)`,
      [title, author, summary, content]
    );
    await db.end();

    res.status(201).json({ message: "Blog post created successfully" });
  } catch (err) {
    console.error("❌ Error creating blog post:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};