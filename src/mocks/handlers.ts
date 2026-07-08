import { userHandlers } from "./userHandlers";
import { authHandlers } from "./authHandlers";

export const handlers = [
  ...userHandlers,
  ...authHandlers,
];