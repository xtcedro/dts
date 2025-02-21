import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../config/db.js"; // Import database connection

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message, user_id } = req.body || {}; // Handle empty requests

        // System prompt: AI identity and behavior
        const systemPrompt = `
        You are Dominguez Tech Solutions AI Assistant, an expert in AI, web development, and business automation.
        Stay professional, concise, and helpful. Ensure all responses reflect the following **accurate pricing**:

        🎓 **AI & Web Development Crash Course:**
        - 💰 **One-time fee:** $69 per person
        - ✅ Includes course materials, real-world projects, and lifetime access to resources.
        - 📍 **Location:** Downtown Oklahoma City Metropolitan Library
        - 📅 **Reserve your seat now:**
          <a href="https://www.domingueztechsolutions.com/appointment-booker.html" target="_blank" style="color: #FFD700; text-decoration: underline;">
          www.domingueztechsolutions.com/appointment-booker.html</a>

        📌 **Website Development Packages:**
        - 🚀 **Starter:** $100 (Fully responsive design, basic SEO)
        - 💼 **Business:** $200 (Advanced SEO, secure user accounts, email verification)
        - 🏆 **Enterprise:** $300 (Premium SEO, E-Commerce, Stripe/PayPal integration)

        💡 **Custom Development:**
        For specialized website features, pricing is based on project scope. Users should contact Dominguez Tech Solutions for a custom quote.

        ✉️ **For inquiries, contact us at:**
        <a href="mailto:domingueztechsolutions@gmail.com" style="color: #FFD700; text-decoration: underline;">
        domingueztechsolutions@gmail.com</a>

        **Important:** The **Appointment Booker** is **only** for enrolling in the AI & Web Development Crash Course.
        For other services, users must **email or request a custom quote**.
        `;

	// Handle first interaction with a structured introduction
	if (!message) {
		return res.json({
			reply: `
			<b>Welcome to Dominguez Tech Solutions! 🚀</b><br><br>
			I’m your AI assistant, here to assist with <b>AI integration, web development, and business automation.</b><br><br>

			📚 <b>AI & Web Development Crash Course</b> – <a href="https://www.domingueztechsolutions.com/appointment-booker.html" target="_blank" style="color: #FFD700; text-decoration: underline;">Reserve Your Spot</a>.<br><br>

			🌐 <b>Web Development & Custom Solutions</b> – <a href="pricing.html" target="_blank" style="color: #FFD700; text-decoration: underline;">View Pricing</a>.<br><br>

			📩 <b>Contact Us:</b> <a href="mailto:domingueztechsolutions@gmail.com" style="color: #FFD700; text-decoration: underline;">Email Here</a>.<br><br>

			<b>How can I assist you today?</b>
			`
		});
	}

        // Retrieve chat history (last 5 messages) for better responses
        const [history] = await db.query(
            "SELECT user_message, bot_reply FROM chat_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 5",
            [user_id || null]
        );

        // Format chat history
        const chatHistory = history.map(entry => `User: ${entry.user_message}\nAI: ${entry.bot_reply}`).join("\n");

        // AI Processing
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 300, // Limits response length
                temperature: 0.7, // Adjusts creativity level
            },
        });

        // Send message to AI
        const response = await chat.sendMessage([systemPrompt, chatHistory, message]);
        const botReply = response.response.text();

        // Store chat conversation in database
        await db.query(
            "INSERT INTO chat_history (user_id, user_message, bot_reply) VALUES (?, ?, ?)",
            [user_id || null, message, botReply]
        );

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed. Please try again later." });
    }
};

export const fetchChatHistory = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null; // Get user ID from token (if authenticated)

        // Retrieve last 10 messages (adjust as needed)
        const [history] = await db.query(
            "SELECT user_message, bot_reply FROM chat_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
            [userId || null]
        );

        res.json({ history });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to retrieve chat history" });
    }
};
