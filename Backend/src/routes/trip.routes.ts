import { Router } from "express";
import { TripController } from "../controllers/TripController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post("/", TripController.create);
router.get("/", TripController.list);
router.get("/calculate", TripController.calculate);
router.delete('/:id',    TripController.delete);

export default router;
