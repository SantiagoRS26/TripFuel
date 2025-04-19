import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", authenticate, AuthController.me);
router.put("/fuel-prices", authenticate, AuthController.updateFuelPrices);

export default router;
