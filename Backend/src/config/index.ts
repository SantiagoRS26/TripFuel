import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT ?? 4000,
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/moto',
  JWT_SECRET: process.env.JWT_SECRET ?? 'cambiame-por-uno-seguro'
};