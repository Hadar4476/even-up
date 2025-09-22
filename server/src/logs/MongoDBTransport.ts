import TransportStream from "winston-transport";
import Log from "../models/log";

class MongoDBTransport extends TransportStream {
  constructor(opts?: TransportStream.TransportStreamOptions) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    try {
      // Save the log entry to the MongoDB collection
      const logEntry = new Log({
        level: info.level,
        message: info.message,
        meta: info.meta || {},
        timestamp: info.timestamp || new Date(),
      });
      await logEntry.save();
    } catch (err) {
      console.error("Failed to save log to MongoDB:", err);
    }

    // Call the callback when done
    callback();
  }
}

export default MongoDBTransport;
