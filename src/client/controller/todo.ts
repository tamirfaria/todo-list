import { Todo } from "@client/model/todo";
import { todoRepository } from "@client/repository/todo";

interface TodoControllerGetParams {
  page?: number;
  limit?: number;
}

interface TodoControllerCreateParams {
  content?: string;
  onError: () => void;
  onSuccess: (todo: Todo) => void;
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

async function create({
  content,
  onError,
  onSuccess,
}: TodoControllerCreateParams) {
  if (!content) {
    onError();
    return;
  }

  const todo = {
    id: "123123",
    content,
    date: new Date(),
    done: false,
  };

  onSuccess(todo);
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
  create,
  filterTodosByContent,
};
