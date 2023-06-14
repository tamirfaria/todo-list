export interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}

export interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
}

export interface TodoRepositoryGetResponse {
  pages: number;
  total: number;
  todos: Todo[];
}
