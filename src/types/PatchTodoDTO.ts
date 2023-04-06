import { Todo } from "./Todo";

export type PatchTodoDTO = Pick<Todo, "id" | "completed">;
