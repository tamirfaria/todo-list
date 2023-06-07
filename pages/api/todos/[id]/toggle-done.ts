import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    todoController.toggleDone(req, res);
    return;
  }

  res.status(405).json({
    error: { message: "Method not allowed" },
  });
}
