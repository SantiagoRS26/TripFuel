import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post("/", VehicleController.create);
router.get("/", VehicleController.list);
router.put("/:id", VehicleController.update);
router.delete("/:id", VehicleController.delete);

export default router;
