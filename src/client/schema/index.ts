import { z as schema } from "zod";

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string().datetime(),
  done: schema.boolean(),
});

export const ServerResponseSchema = schema.object({
  todo: TodoSchema,
});

export type Todo = schema.infer<typeof TodoSchema>;
