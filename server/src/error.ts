class AppError extends Error {
  public statusCode: number;
  public details?: any; // Optional field for additional error details

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export default AppError;
