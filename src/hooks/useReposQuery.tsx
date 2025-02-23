import { useGetReposQuery } from '../store/api/repos.api'

const useReposQuery = (username: string, page: number, perPage: number) => {
  return useGetReposQuery(
    { username, page, perPage },
    { skip: username === '' },
  )
}

export default useReposQuery
