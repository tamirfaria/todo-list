import { todoRepository } from "@client/repository/todo";
import { Todo } from "@client/schema";
import { z as schema } from "zod";

interface TodoControllerGetParams {
  page?: number;
  limit?: number;
}

interface TodoControllerCreateParams {
  content?: string;
  onError: (errorMessage?: string) => void;
  onSuccess: (todo: Todo) => void;
}

interface TodoControllerFilterParams {
  todoList: Todo[];
  search: string;
}

interface TodoControllerToggleDone {
  id: string;
  onError: () => void;
  onSuccess: () => void;
  updateTodoOnScreen: () => void;
}

function get({ page, limit }: TodoControllerGetParams) {
  return todoRepository.get({
    page: page || 1,
    limit: limit || 2,
  });
}

async function create({
  content,
  onError,
  onSuccess,
}: TodoControllerCreateParams) {
  const parsedParams = schema.string().nonempty().safeParse(content?.trim());

  if (!parsedParams.success) {
    onError();
    return;
  }

  todoRepository
    .createByContent(parsedParams.data)
    .then((newTodo) => {
      onSuccess(newTodo);
    })
    .catch(() => {
      onError();
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

function toggleDone({
  id,
  onError,
  onSuccess,
  updateTodoOnScreen,
}: TodoControllerToggleDone) {
  todoRepository
    .toggleDone(id)
    .then(() => {
      updateTodoOnScreen();
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

async function deleteTodoById(id: string) {
  await todoRepository.deleteTodoById(id);
}

export const todoController = {
  get,
  create,
  filterTodosByContent,
  toggleDone,
  deleteTodoById,
};
