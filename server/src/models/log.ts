import mongoose, { Document, Schema } from "mongoose";

interface ILog extends Document {
  level: string;
  message: string;
  meta: any;
  timestamp: Date;
}

const logSchema: Schema = new Schema(
  {
    level: { type: String, required: true }, // 'info', 'error', etc.
    message: { type: String, required: true },
    meta: { type: Object, default: {} }, // Additional metadata
    timestamp: { type: Date, default: Date.now },
  },
  { capped: { size: 1024 * 1024, max: 10 } } // Capped collection: ~1MB, max 10 documents
);

const Log = mongoose.model<ILog>("Log", logSchema);

export default Log;
