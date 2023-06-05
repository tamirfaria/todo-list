import { Todo } from "@client/model/todo";
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
  const convertedData = validatedResponse(data);

  return {
    todos: convertedData.todos,
    total: convertedData.total,
    pages: convertedData.pages,
  };
}

export const todoRepository = {
  get,
};
