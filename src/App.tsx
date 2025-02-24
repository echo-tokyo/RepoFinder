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
  const debouncedUsername = useDebouncedValue(username, 1000)
  
  // API
  const { isSuccess } = useUserQuery(debouncedUsername)
  const { data, isError, error, isFetching } = useReposQuery(
    debouncedUsername,
    page,
    perPage,
  )
  
  // Сброс репозиториев при изменении имени пользователя
  useEffect(() => {
    setRepos([])
    setPage(1)
  }, [debouncedUsername, username])
  
  // Обновление репозиториев при получении новых данных
  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      setRepos([...repos, ...data])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])
  
  // Скролл
  useScrollLoadMore(() => {
    setPage((prev) => prev + 1)
  })
  
  // Сеттеры
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
        {repos.length !== 0 && <RepoList repos={repos} />}
        {isFetching && <p>Загрузка...</p>}
        </>
      )}
    </>
  )
}

export default App