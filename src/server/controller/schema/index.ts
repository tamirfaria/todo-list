import { z as schema } from "zod";

export const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});