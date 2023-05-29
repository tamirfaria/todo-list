import { validatedResponse } from "@utils/validatedResponse";

export interface Todo {
  id: string;
  content: string;
  date: string;
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
  const res = await fetch("/api/todos");
  const data = await res.json();
  const convertedData = validatedResponse(data);

  const totalData = convertedData.todos.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = convertedData.todos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalData / limit);

  return {
    todos: paginatedData,
    total: totalData,
    pages: totalPages,
  };
}

export const todoRepository = {
  get,
};
