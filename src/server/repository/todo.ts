import { create, read, update } from "@db-crud-todo";
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
  const currentLimit = limit || 10;
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

async function toggleDone(id: string): Promise<Todo> {
  const ALL_TODOS = read();
  const filteredTodo = ALL_TODOS.find((todo) => todo.id === id);
  if (!filteredTodo) throw new Error(`TODO with id: ${id} not find`);

  const updatedTodo = update(filteredTodo.id, { done: !filteredTodo.done });
  return updatedTodo;
}
export const todoRepository = {
  get,
  createByContent,
  toggleDone,
};
