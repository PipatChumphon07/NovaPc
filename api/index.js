const app = require("../server/src/app");
const connectDB = require("../server/src/config/db");

// Vercel invokes this one function for every /api/* request (see vercel.json).
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database initialization failed", error);
    return res.status(503).json({ message: "Database is unavailable" });
  }
};
