import { ChangeEvent, useEffect, useState } from 'react'
import RepoList from './components/Repos/RepoList'
import { useGetReposQuery } from './store/api/repos.api'

function App() {
  const [username, setUsername] = useState<string>('')
  const [debouncedUsername, setDebouncedUsername] = useState<string>(username)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [username])

  const {
    data: repos,
    isError,
    isFetching,
    error,
  } = useGetReposQuery(debouncedUsername, {
    skip: debouncedUsername === '',
  })

  return (
    <>
      <form action=''>
        <input
          type='text'
          placeholder='Введите имя пользователя'
          onChange={handleChange}
        />
      </form>
      {isFetching && <p>Загрузка...</p>}
      {isError && (
        <p>{(error as { data: { message: string } }).data.message}</p>
      )}
      {debouncedUsername && repos && !isFetching && !isError && (
        <RepoList repos={repos} />
      )}
    </>
  )
}

export default App