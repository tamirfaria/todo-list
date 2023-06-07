import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method === "GET") {
    todoController.get(req, res);
    return;
  }

  if (method === "POST") {
    todoController.create(req, res);
    return;
  }

  res.status(405).json({
    error: { message: "Method not allowed" },
  });
}
