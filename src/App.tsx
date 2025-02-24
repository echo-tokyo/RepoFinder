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

  // Дебаунс
  const debouncedUsername = useDebouncedValue(username, 500)

  // API
  const { isSuccess } = useUserQuery(debouncedUsername)
  const { data, isError, error, isFetching } = useReposQuery(
    debouncedUsername,
    page,
    perPage,
  )

  // .then
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setRepos((prevRepos) => [...prevRepos, ...data])
    }
  }, [data, isSuccess])

  // Скролл
  useScrollLoadMore(() => {
    setPage((prev) => prev + 1)
  })

  // Сеттеры
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setRepos([])
    setPage(1)
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
          {debouncedUsername && repos.length === 0 && !isFetching && (
            <p>Репозиториев нет</p>
          )}
          {debouncedUsername && repos.length > 0 && <RepoList repos={repos} />}
          {isFetching && <p>Загрузка...</p>}
        </>
      )}
    </>
  )
}

export default App
