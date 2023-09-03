import { LoginResponse } from '@/pages/api/login';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, void>({
      query: () => 'api/login',
    }),
  }),
});

export const { useLoginMutation } = authApi;
