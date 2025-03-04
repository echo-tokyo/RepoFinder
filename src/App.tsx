import { ChangeEvent, useEffect, useState } from 'react'
import RepoList from './components/Repos/RepoList'
import useDebouncedValue from './hooks/useDebouncedValue'
import useReposQuery from './hooks/useReposQuery'
import useUserQuery from './hooks/useUserQuery'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { resetRepos, updateRepos } from './store/repos/repos.slice'
import { IQuery } from './types/query'
import useScrollHandler from './hooks/useScrollHandler'
import './app.scss'

function App() {
  const dispatch = useDispatch()
  const repos = useTypedSelector((state) => state.repos)
  const [username, setUsername] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const perPage = 20

  // Debounce
  const debouncedUsername = useDebouncedValue(username, 1000)
  useEffect(() => {
    dispatch(resetRepos())
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername])

  // API
  const { data: userData, isSuccess } = useUserQuery(debouncedUsername)
  const { data, isError, error, isFetching }: IQuery = useReposQuery(
    debouncedUsername,
    page,
    perPage,
  )

  // .then
  useEffect(() => {
    if (isSuccess && Array.isArray(data) && !isFetching) {
      dispatch(updateRepos(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])

  // Pagination scroll
  useScrollHandler(
    () => {
      setPage((prev) => prev + 1)
    },
    userData,
    repos,
    isFetching,
  )

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
        <p className='status'>
          {(error as { data: { message: string } }).data.message}
        </p>
      ) : (
        <>
          {debouncedUsername &&
            repos.length === 0 &&
            !isFetching &&
            data &&
            data.length === 0 && <p className='status'>Репозиториев у пользователя "{userData.login}" нет</p>}
          {debouncedUsername && <RepoList />}
          {isFetching && <p className='status'>Загрузка...</p>}
        </>
      )}
    </>
  )
}

export default App
