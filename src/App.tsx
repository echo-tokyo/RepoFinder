import { ChangeEvent, useEffect, useState } from 'react'
import RepoList from './components/Repos/RepoList'
import useDebouncedValue from './hooks/useDebouncedValue'
import useReposQuery from './hooks/useReposQuery'
import useUserQuery from './hooks/useUserQuery'
import { IRepo } from './types/repo'
import useScrollLoadMore from './hooks/useScrollHandler'

function App() {
  const [username, setUsername] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [repos, setRepos] = useState<IRepo[]>([])
  const perPage = 20
  
  // Debounce
  const debouncedUsername = useDebouncedValue(username, 1000)

  useEffect(() => {
    setRepos([])
    setPage(1)
  }, [debouncedUsername])
  
  // API
  const { data: userData, isSuccess } = useUserQuery(debouncedUsername)
  const { data, isError, error, isFetching } = useReposQuery(
    debouncedUsername,
    page,
    perPage,
  )
  
  // .then
  useEffect(() => {
    console.log(repos)
    if (isSuccess && Array.isArray(data) && !isFetching) {
      setRepos(prev => [...prev, ...data])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])

  // Pagination scroll
  useScrollLoadMore(() => {
      setPage((prev) => prev + 1)
  }, userData, repos)
  
  // Setters
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <>
      <form action=''>
        <input
          type='text'
          placeholder='Введите имя пользователя'
          onChange={handleChange}
        />
      </form>

      {isError ? (
        <p>{(error as { data: { message: string } }).data.message}</p>
      ) : (
        <>
        {debouncedUsername && repos.length === 0 && !isFetching && data && data.length === 0 && <p>Репозиториев нет</p>}
        {debouncedUsername && <RepoList repos={repos} />}
        {isFetching && <p>Загрузка...</p>}
        </>
      )}
    </>
  )
}

export default App