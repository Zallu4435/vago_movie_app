import { Session } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      session: {
        id: string;
      } & Session;
    }
  }
}
