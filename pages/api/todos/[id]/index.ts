import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    await todoController.deleteTodoById(req, res);
    return;
  }

  if (req.method === "PUT") {
    await todoController.toggleDone(req, res);
    return;
  }

  res.status(405).json({
    error: { message: "Method not allowed" },
  });
}
