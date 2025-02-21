import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.github.com/'

export const reposApi = createApi({
  reducerPath: 'reposApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `token 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`,
      )
      headers.set('X-GitHub-Api-Version', '2022-11-28')
      return headers
    },
  }),
  endpoints: (build) => ({
    getRepos: build.query({
      query: (username) => `/users/${username}/repos`,
    }),
  }),
})

export const { useGetReposQuery } = reposApi
