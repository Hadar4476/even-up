import { createLogger, format, transports } from "winston";
import MongoDBTransport from "./MongoDBTransport";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json() // Logs in JSON format
  ),
  transports: [
    new transports.Console(), // Console for debugging
    new MongoDBTransport(), // Save logs to MongoDB
  ],
});

export default logger;
