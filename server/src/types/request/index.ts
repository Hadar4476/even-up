import { Request } from "express";

export interface CommonRequest extends Request {
  user?: {
    id: string; // MongoDB ID or any identifier you prefer
  };
}
