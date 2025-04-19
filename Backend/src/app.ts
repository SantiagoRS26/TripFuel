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

	app.use("/api/auth", authRoutes);
	app.use("/api/trips", tripRoutes);

	app.use(errorHandler);

	return app;
};
