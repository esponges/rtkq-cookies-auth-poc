import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDetailsResponse } from '@/pages/api/user-details';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin,
  }),
  endpoints: (builder) => ({
    userDetails: builder.query<UserDetailsResponse, { token: string }>({
      query: ({ token }) => ({
        url: 'api/user-details',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          // any other params
        },
      }),
      keepUnusedDataFor: 300, // keep data 5 minutes in cache - then refetch if needed again
    }),
  }),
});

export const { useUserDetailsQuery } = userApi;
