import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Todo } from "../types/Todo";
import { deleteTodo, getAllTodos, patchTodo, postTodo } from "./actions";

type TodoState = {
  list: Todo[];
  loading: boolean;
  error?: string;
};
const initialState: TodoState = {
  list: [],
  loading: true,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL TODOS
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    // POST TODO
    builder.addCase(postTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [action.payload, ...state.list];
    });

    // DELETE TODO
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.loading = false;
    });

    // PATCH TODO
    builder.addCase(patchTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(patchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.map((item) =>
        item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
      );
    });
  },
});

export const getTodoState = (state: RootState) => state.todos;

export default todoSlice.reducer;
