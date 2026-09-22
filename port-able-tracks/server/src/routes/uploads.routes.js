const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

router.post("/image", requireAuth, express.raw({ type: "image/*", limit: MAX_UPLOAD_BYTES }), async (req, res, next) => {
  try {
    const contentType = req.get("content-type")?.split(";", 1)[0].toLowerCase();
    if (!contentType || !ALLOWED_TYPES.has(contentType)) {
      return res.status(415).json({ message: "Only JPEG, PNG, WebP, and GIF images are supported" });
    }
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "An image request body is required" });
    }

    // Loaded here so the core API can still start in local setups that do not use uploads.
    const { put } = require("@vercel/blob");
    const extension = contentType.split("/")[1].replace("jpeg", "jpg");
    const blob = await put(`uploads/${req.user.sub}/${Date.now()}.${extension}`, req.body, {
      access: "public",
      addRandomSuffix: true,
      contentType
    });
    return res.status(201).json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
