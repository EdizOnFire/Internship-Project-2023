import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'https://fakestoreapi.com';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
});