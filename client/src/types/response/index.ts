export * from "./user";

export interface ICommonResponse<T = any> {
  success: boolean;
  statusCode?: number;
  data?: T;
  message?: string;
  details?: any;
}
