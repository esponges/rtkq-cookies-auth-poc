import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { authReducer } from './slices/auth';

export const store = configureStore({
  reducer: {
    // regular reduces
    auth: authReducer,
    // rtks query api
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
