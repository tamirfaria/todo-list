import fs from "fs";
import { v4 as uuid } from "uuid";

export interface TodoList {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

const DB_FILE_PATH = "./core/db";

export function create(content: string): TodoList {
  const todo: TodoList = {
    id: uuid(),
    date: new Date().toISOString().split("T")[0],
    content: content,
    done: false,
  };

  const todoList: Array<TodoList> = [...read(), todo];
  const stringfiedTodo = JSON.stringify({ todoList }, null, 2);
  fs.writeFileSync(DB_FILE_PATH, stringfiedTodo);

  return todo;
}

export function read(): Array<TodoList> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8") || "{}";
  const db = JSON.parse(dbString);
  return !db.todoList ? [] : db.todoList;
}

export function update(id: string, partialTodo: Partial<TodoList>): TodoList {
  let updatedTodo;
  const todoList = read();
  todoList.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      //* O Object.assing sobreescreve as props do primeiro parâmetro com as props do segundo parâmetro
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  if (!updatedTodo) {
    throw new Error("Please, provide another ID");
  }

  const stringfiedTodo = JSON.stringify({ todoList }, null, 2);
  fs.writeFileSync(DB_FILE_PATH, stringfiedTodo);

  return updatedTodo;
}

export function updateContentById(id: string, content: string): TodoList {
  return update(id, { content });
}

export function deleteById(id: string) {
  const todoList = read();
  const todoListWithoutDeletedTodo = todoList.filter((todo) => {
    const isEqualId = id === todo.id;
    if (!isEqualId) {
      return true;
    }
    return false;
  });
  const stringfiedTodo = JSON.stringify(
    { todoList: todoListWithoutDeletedTodo },
    null,
    2
  );
  fs.writeFileSync(DB_FILE_PATH, stringfiedTodo);
}

export function clear(): void {
  fs.writeFileSync(DB_FILE_PATH, "");
}
