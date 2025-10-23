export abstract class AppError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number,
      public readonly code: string,
      public readonly isOperational: boolean = true
    ) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  