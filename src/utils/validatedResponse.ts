import { Todo } from "@client/model/todo";

interface ValidatedResponseParams {
  responseBody: unknown;
}

interface ValidatedResponseReturn {
  todos: Todo[];
  pages: number;
  total: number;
}

export function validatedResponse({
  ...responseBody
}: ValidatedResponseParams): ValidatedResponseReturn {
  const isValidResponse =
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    "pages" in responseBody &&
    "total" in responseBody;

  if (isValidResponse && Array.isArray(responseBody.todos)) {
    const pages = Number(responseBody.pages);
    const total = Number(responseBody.total);
    const todos = responseBody.todos.map((todo) => {
      const hasError = todo === null && typeof todo !== "object";
      if (hasError) {
        throw new Error("Invalid data from API");
      }

      const { id, content, date, done } = todo as {
        id: string;
        content: string;
        date: string;
        done: boolean;
      };

      return {
        id,
        content,
        date,
        done,
      };
    });

    return {
      todos,
      total,
      pages,
    };
  }

  return {
    pages: 1,
    total: 0,
    todos: [],
  };
}
