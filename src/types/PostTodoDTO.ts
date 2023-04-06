import { Todo } from "./Todo";

export type PostTodoDTO = Omit<Todo, "id">;
