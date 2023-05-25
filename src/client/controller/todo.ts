export interface TodoList {
  id: string;
  content: string;
  date: string;
  done: boolean;
}

async function get() {
  const res = await fetch("/api/todos");
  const data = await res.json();
  return data.todos;
}

export const getTodo = {
  get,
};
