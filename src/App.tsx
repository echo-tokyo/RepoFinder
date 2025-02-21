import { ChangeEvent, useState, useEffect } from 'react'
import Card from './components/Card'
import { useGetReposQuery } from './store/reposApi'
import { IRepo } from './types/repo'

function App() {
  const [username, setUsername] = useState<string>('')
  const [debouncedUsername, setDebouncedUsername] = useState<string>(username)
  const [shouldClearRepos, setShouldClearRepos] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username)
      setShouldClearRepos(username === '')
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [username])

  const { data: repos, isError, isFetching } = useGetReposQuery(debouncedUsername, {
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
      {isError && <p>Пользователь не найден</p>}
        {!shouldClearRepos &&repos && username && !isFetching && !isError && (
          <>
            {repos.length === 0 ? (
              <p>Репозиториев у пользователя нет</p>
            ) : (
              repos.map((el: IRepo) => <Card el={el} key={el.id} />)
            )}
          </>
        )
      }
    </>
  )
}

export default App