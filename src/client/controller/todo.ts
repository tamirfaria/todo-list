import { Todo } from "@client/model/todo";
import { todoRepository } from "@client/repository/todo";

interface TodoControllerGetParams {
  page?: number;
  limit?: number;
}

interface TodoControllerFilterParams {
  todoList: Todo[];
  search: string;
}

async function get({ page, limit }: TodoControllerGetParams) {
  return todoRepository.get({
    page: page || 1,
    limit: limit || 1,
  });
}

function filterTodosByContent({
  todoList,
  search,
}: TodoControllerFilterParams) {
  const filteredTodos = todoList.filter((todo) => {
    const contentNormalized = todo.content.toLowerCase();
    const searchNormalized = search.toLowerCase();
    return contentNormalized.includes(searchNormalized);
  });
  return filteredTodos;
}

export const todoController = {
  get,
  filterTodosByContent,
};
