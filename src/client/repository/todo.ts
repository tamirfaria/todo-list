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

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetResponse> {
  const res = await fetch(`/api/todos?page=${page}&limit=${limit}`);
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
