import { User } from "../models";

declare global {
  namespace Express {
    interface Locals {}
    interface Request {
      user: Pick<User, "id" | "email" | "role">;
    }
  }
}
