import { HttpNotFoundError } from "@server/infra/errors";
import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoCreateBodySchema, TodoIdSchema } from "../schema";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  if ((req.query.page && isNaN(page)) || (req.query.limit && isNaN(limit))) {
    res.status(400).json({
      error: { message: "page and limit must be a number" },
    });
    return;
  }

  const { pages, total, todos } = await todoRepository.get({ page, limit });

  res.status(200).json({
    pages,
    total,
    todos,
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
  const todo = await todoRepository.createByContent(body.data.content);

  res.status(201).json({ todo });
}

async function toggleDone(req: NextApiRequest, res: NextApiResponse) {
  const id = TodoIdSchema.safeParse(req.query.id);

  if (!id.success) {
    res.status(400).json({
      error: { message: "You must be provide a correct string Id" },
    });
    return;
  }

  try {
    const todo = await todoRepository.toggleDone(id.data);
    res.status(200).json({ todo });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        error: { message: err.message },
      });
    }
  }
}

async function deleteTodoById(req: NextApiRequest, res: NextApiResponse) {
  const id = TodoIdSchema.safeParse(req.query.id);

  if (!id.success) {
    res.status(400).json({
      error: { message: "You must be provide a valid id" },
    });
    return;
  }

  try {
    await todoRepository.deleteTodoById(id.data);
    res.status(204).end();
    return;
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      res.status(err.status).json({ error: { message: err.message } });
    }
  }

  res.status(500).json({
    error: { message: "Internal server error" },
  });
}

export const todoController = {
  get,
  create,
  toggleDone,
  deleteTodoById,
};
