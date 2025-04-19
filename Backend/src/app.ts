import express from "express";
import { json } from "body-parser";
import cors from "cors";
import tripRoutes from "./routes/trip.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = () => {
	const app = express();

	app.use(cors());

	app.use(json());

	app.get("/", (_req, res) => {
		res.json({
			status: "ok",
			message: "🚀 Trip-Fuel API está en funcionamiento",
			version: "1.0.0",
		});
	});

	app.use("/api/auth", authRoutes);
	app.use("/api/trips", tripRoutes);

	app.use(errorHandler);

	return app;
};
