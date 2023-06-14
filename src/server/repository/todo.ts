import { create, deleteById, read, update } from "@db-crud-todo";
import { Todo } from "@server/model/todo";
import { TodoSchema } from "@server/schema";
import { createClient } from "@supabase/supabase-js";

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
}

interface TodoRepositoryGetResponse {
  pages: number;
  total: number;
  todos: Todo[];
}

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseApiKey = process.env.SUPABASE_SECRET_KEY || "";
const supabase = createClient(supabaseUrl, supabaseApiKey);

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetResponse> {
  const currentPage = page || 1;
  const currentLimit = limit || 10;
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit - 1;

  const { data, error, count } = await supabase
    .from("todos")
    .select("*", { count: "exact" })
    .range(startIndex, endIndex);

  if (error) throw new Error("Failed to fetch data");

  const parsedData = TodoSchema.array().safeParse(data);

  if (!parsedData.success)
    throw new Error("Failed to parse TODO from database");

  const todos = parsedData.data;
  const total = count || todos.length;
  const pages = Math.ceil(total / currentLimit);

  return { pages, total, todos };
}

async function createByContent(content: string) {
  const newTodo = create(content);
  return newTodo;
}

async function toggleDone(id: string): Promise<Todo> {
  const ALL_TODOS = read();
  const validatedId = ALL_TODOS.find((todo) => todo.id === id);
  if (!validatedId) throw new Error(`TODO with id: ${id} not find`);

  const updatedTodo = update(validatedId.id, { done: !validatedId.done });
  return updatedTodo;
}

async function deleteTodoById(id: string) {
  const ALL_TODOS = read();
  const validatedId = ALL_TODOS.find((todo) => todo.id === id);
  if (!validatedId) throw new Error(`TODO with id: ${id} not find`);
  deleteById(id);
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
  deleteTodoById,
};
