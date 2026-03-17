import express from "express"
import passport from "../config/passport.js"
import jwt from "jsonwebtoken"
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Step 1 -> redirect to Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // always show account chooser
  })
);

// Step 2 -> Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          _id: req.user._id,
          role: req.user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "55d" }
      );

      res.redirect(
        `${process.env.CLIENT_URL}/auth-success?token=${token}`
      );
    } catch (err) {
      console.error("Google login error", err);
      res.redirect(
        `${process.env.CLIENT_URL}/login?err=google_failed`
      );
    }
  }
);

//OUTSIDE callback
router.get("/me", isAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;