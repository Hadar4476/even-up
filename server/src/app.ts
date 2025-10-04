import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import requestLogger from "./logs/request-logger";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import groupRoutes from "./routes/group";
import groupInvitationRoutes from "./routes/group-invitation";
import expenseRoutes from "./routes/expense";

import errorHandler from "./middleware/error";

import config from "./config";

import initLogs from "./utils/initLogs";

const app = express();

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors());

const MAIN_ROUTE = "/api";

app.use(`${MAIN_ROUTE}/user`, userRoutes);
app.use(`${MAIN_ROUTE}/auth`, authRoutes);
app.use(`${MAIN_ROUTE}/group`, groupRoutes);
app.use(`${MAIN_ROUTE}/group-invitation`, groupInvitationRoutes);
app.use(`${MAIN_ROUTE}/expense`, expenseRoutes);

app.use(errorHandler);

const server = http.createServer(app);

mongoose
  .connect(config.MONGO_URI)
  .then(async () => {
    await initLogs();

    if (require.main === module) {
      server.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Handle termination signals
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  mongoose.connection.close(false);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  mongoose.connection.close(false);
});
