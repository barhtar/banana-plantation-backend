export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: 400 | 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
