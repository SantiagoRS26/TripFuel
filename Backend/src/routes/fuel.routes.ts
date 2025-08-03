import { Router } from "express";
import { FuelPriceController } from "../controllers/FuelPriceController";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", FuelPriceController.getPrices);
router.put("/", authenticate, authorize(["admin"]), FuelPriceController.updatePrices);

export default router;
