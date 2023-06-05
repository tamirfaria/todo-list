import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoCreateBodySchema } from "./schema";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const hasQuery = req.query.page && req.query.limit;
  const hasValidNumber = !isNaN(page) && !isNaN(limit);

  if (hasQuery && !hasValidNumber) {
    res.status(400).json({
      error: { message: "page and limit must be a number" },
    });
    return;
  }

  const response = todoRepository.get({ page, limit });

  res.status(200).json({
    pages: response.pages,
    total: response.total,
    todos: response.todos,
  });
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const body = TodoCreateBodySchema.safeParse(req.body);

  if (!body.success) {
    res.status(400).json({
      error: {
        message: "You need to provide a content to create a TODO",
        description: body.error.issues,
      },
    });
    return;
  }
  const createdTodo = await todoRepository.createByContent(body.data.content);

  res.status(201).json({
    todo: createdTodo,
  });
}

export const todoController = {
  get,
  create,
};
