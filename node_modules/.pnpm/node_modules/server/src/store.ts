import { Form, Response } from "./schema.js";

interface Store {
  forms: Form[];
  responses: Response[];
}

export const store: Store = {
  forms: [],
  responses: [],
};