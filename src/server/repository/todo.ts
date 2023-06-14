import { supabase } from "@server/infra/database/supabase";
import {
  Todo,
  TodoRepositoryGetParams,
  TodoRepositoryGetResponse,
} from "@server/model/todo";
import { TodoSchema } from "@server/schema";

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
    .order("date", { ascending: false })
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
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        content,
        done: false,
      },
    ])
    .select()
    .single();

  if (error) throw new Error("Failed to create a new TODO...");
  const parsedData = TodoSchema.parse(data);
  return parsedData;
}

async function getTodoById(id: string) {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Failed to get TODO by Id...");
  const parsedData = TodoSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Failed to parse TODO created...");
  return parsedData.data;
}

async function toggleDone(id: string): Promise<Todo> {
  const todo = await getTodoById(id);
  const { data, error } = await supabase
    .from("todos")
    .update({
      done: !todo.done,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update TODO by Id...");

  const parsedData = TodoSchema.parse(data);
  return parsedData;
}

async function deleteTodoById(id: string) {
  const { error } = await supabase.from("todos").delete().match({ id });
  if (error) throw new Error("Failed to delete TODO by Id...");
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
  deleteTodoById,
};
