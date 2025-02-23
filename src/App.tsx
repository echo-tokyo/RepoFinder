import { ChangeEvent, useState } from 'react'
import RepoList from './components/Repos/RepoList'
import useDebouncedValue from './hooks/useDebouncedValue'
import useReposQuery from './hooks/useReposQuery'

function App() {
  const [username, setUsername] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const perPage = 20

  // Дебаунс
  const debouncedUsername = useDebouncedValue(username, 500)

  // API
  const { data, isError, error, isFetching } = useReposQuery(
    debouncedUsername,
    page,
    perPage,
  )

  // Сеттеры
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
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
      ) : isFetching ? (
        <p>Загрузка...</p>
      ) : debouncedUsername ? (
        <RepoList repos={data} />
      ) : null}
    </>
  )
}

export default App