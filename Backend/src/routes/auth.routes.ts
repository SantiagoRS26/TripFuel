import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/auth";
import passport from "../config/passport";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", authenticate, AuthController.me);
router.get(
        "/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
		failureRedirect: "/login",
	}),
	AuthController.googleCallback
);

export default router;
