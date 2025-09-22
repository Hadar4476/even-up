import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT ?? 3000,
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/evenup",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  TOKEN_SECRET: process.env.TOKEN_SECRET ?? "",
};

export default config;
