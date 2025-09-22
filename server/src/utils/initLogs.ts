import mongoose from "mongoose";

const initLogs = async () => {
  const connection = mongoose.connection.db;
  const collections = await connection?.listCollections().toArray();
  const logsCollection = collections?.find((col) => col.name === "logs");

  if (!logsCollection) {
    await connection?.createCollection("logs", {
      capped: true,
      size: 1024 * 1024, // ~1MB
      max: 10, // Max 10 documents
    });
    console.log("Created capped collection: logs");
  }
};

export default initLogs;
