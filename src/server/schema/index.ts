import { z as schema } from "zod";

export const TodoCreateBodySchema = schema.object({
  content: schema.string().nonempty(),
});

export const TodoIdSchema = schema.string().uuid().nonempty();

export const TodoSchema = schema.object({
  id: TodoIdSchema,
  content: schema.string().nonempty(),
  date: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  done: schema.boolean(),
});
