import dotenv from "dotenv";
dotenv.config();

export const config = {
        PORT: process.env.PORT ?? 4000,
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET!,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        OAUTH_CALLBACK_URL: process.env.OAUTH_CALLBACK_URL,
        FUEL_PRICE_TTL_MS: Number(process.env.FUEL_PRICE_TTL_MS) || 5 * 60 * 1000,
};
