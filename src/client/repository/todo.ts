import { validatedResponse } from "@utils/validatedResponse";

export interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

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
