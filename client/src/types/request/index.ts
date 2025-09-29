export * from "./user";
export * from "./post";

export interface ICommonRequest {
  success: boolean;
  statusCode?: number;
  data?: any;
  message?: string;
}
