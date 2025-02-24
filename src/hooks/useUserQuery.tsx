import { useGetUserQuery } from '../store/api/repos.api'

const useUserQuery = (username: string) => {
  return useGetUserQuery(
    { username },
    {skip: username === ''}
  )
}

export default useUserQuery
