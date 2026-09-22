const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentication is required" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "change-this-development-secret");
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

module.exports = { requireAuth };
