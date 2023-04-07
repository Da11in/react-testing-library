import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      todos: todoReducer,
    },
    preloadedState,
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
