import { create, read } from "@db-crud-todo";
import { Todo } from "@server/model/todo";

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
}

interface TodoRepositoryGetResponse {
  pages: number;
  total: number;
  todos: Todo[];
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams): TodoRepositoryGetResponse {
  const currentPage = page || 1;
  const currentLimit = limit || 1;
  const ALL_TODOS = read().reverse();

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;
  const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
  const totalTodos = ALL_TODOS.length;
  const totalPages = Math.ceil(totalTodos / currentLimit);

  return { pages: totalPages, total: totalTodos, todos: paginatedTodos };
}

async function createByContent(content: string) {
  const newTodo = create(content);
  return newTodo;
}

export const todoRepository = {
  get,
  createByContent,
};
