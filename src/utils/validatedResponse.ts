import { Todo } from "@client/repository/todo";

export function validatedResponse(responseBody: unknown): {
  todos: Array<Todo>;
} {
  const isValidResponse =
    responseBody !== null &&
    responseBody !== undefined &&
    typeof responseBody === "object" &&
    "todos" in responseBody;

  if (isValidResponse && Array.isArray(responseBody.todos)) {
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
      todos: todos,
    };
  }
  return {
    todos: [],
  };
}
