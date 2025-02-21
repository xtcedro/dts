import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../config/db.js"; // Import DB connection

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message, user_id } = req.body || {}; // Handle empty requests

        if (!message) {
            return res.json({
                reply: `
                <b>Welcome to Dominguez Tech Solutions! 🚀</b><br>
                I’m your AI assistant, here to help with <b>AI integration, web development, and business automation.</b><br>
                <b>How can I assist you today? 😊</b>
                `
            });
        }

        // Retrieve past chat history (optional)
        const [history] = await db.query(
            "SELECT user_message, bot_reply FROM chat_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 5",
            [user_id || null]
        );

        // Format history for better AI responses
        const chatHistory = history.map(entry => `User: ${entry.user_message}\nAI: ${entry.bot_reply}`).join("\n");

        // AI Processing
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        });

        const response = await chat.sendMessage([chatHistory, message]);
        const botReply = response.response.text();

        // Store message in DB
        await db.query("INSERT INTO chat_history (user_id, user_message, bot_reply) VALUES (?, ?, ?)", [
            user_id || null, message, botReply
        ]);

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed. Please try again later." });
    }
};