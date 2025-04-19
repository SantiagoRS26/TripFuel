import "reflect-metadata";
import { createApp } from "./app";
import { connectDB } from "./db/mongoose";
import { config } from "./config";

connectDB();
const app = createApp();
app.listen(config.PORT, () => {
	console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

export default app;
