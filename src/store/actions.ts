import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

import type { Todo } from "../types/Todo";
import type { PatchTodoDTO } from "../types/PatchTodoDTO";
import type { PostTodoDTO } from "../types/PostTodoDTO";

export const getAllTodos = createAsyncThunk<Todo[], number>(
  "get-all-todos",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Todo[]>(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      );
      return data;
    } catch (err) {
      if (isAxiosError(err)) return rejectWithValue(err.message);

      return rejectWithValue((err as { message: string }).message);
    }
  }
);

export const postTodo = createAsyncThunk<Todo, PostTodoDTO>(
  "post-todo",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Todo>(`https://jsonplaceholder.typicode.com/todos`, item);
      return data;
    } catch (err) {
      if (isAxiosError(err)) return rejectWithValue(err.message);

      return rejectWithValue((err as { message: string }).message);
    }
  }
);

export const patchTodo = createAsyncThunk<PatchTodoDTO, PatchTodoDTO>(
  "patch-todo",
  async (item, { rejectWithValue }) => {
    try {
      await axios.patch<Todo>(`https://jsonplaceholder.typicode.com/todos/${item.id}`, {
        completed: item.completed,
      });
      return item;
    } catch (err) {
      if (isAxiosError(err)) return rejectWithValue(err.message);

      return rejectWithValue((err as { message: string }).message);
    }
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  "delete-todo",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete<Todo[]>(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return id;
    } catch (err) {
      if (isAxiosError(err)) return rejectWithValue(err.message);

      return rejectWithValue((err as { message: string }).message);
    }
  }
);
