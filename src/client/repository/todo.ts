import { ServerResponseSchema, Todo } from "@client/schema";
import { validatedResponse } from "@utils/validatedResponse";

interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRepositoryGetResponse {
  todos: Todo[];
  total: number;
  pages: number;
}

const BASE_URL = "/api/todos";

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetResponse> {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
  const data = await res.json();
  const { todos, total, pages } = validatedResponse(data);
  return { todos, total, pages };
}

async function createByContent(content: string): Promise<Todo> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (response.ok) {
    const serverResponse = await response.json();
    const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse);

    if (!serverResponseParsed.success)
      throw new Error("Failed to create a new TODO...");

    const todo = serverResponseParsed.data.todo;
    return todo;
  }
  throw new Error("Failed to create a new TODO...");
}

async function toggleDone(id: string): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/${id}/toggle-done`, {
    method: "PUT",
  });

  if (response.ok) {
    const serverResponse = await response.json();
    const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse);
    if (!serverResponseParsed.success)
      throw new Error("Failed to update a new TODO...");

    const updatedTodo = serverResponseParsed.data.todo;
    return updatedTodo;
  }
  throw new Error("Server error");
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
};
