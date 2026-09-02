import { z } from "zod";
import { messageResponseSchema } from "../schemas";

// src/errors/custom.ts (archivo .ts normal, NO .d.ts)
export class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// export type MessageResponse = {
//   message: string;
//   success: boolean;
// };

export type MessageResponse = z.infer<typeof messageResponseSchema>;

// export type MessageResponse = {
//   message: string;
//   success: boolean;
// };
