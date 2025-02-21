import { IRepo } from '../../types/repo'
import Card from './Card'

const RepoList = ({ repos }: { repos: IRepo[] }) => {
  if (repos.length === 0) {
    return <p>Репозиториев у пользователя нет</p>
  }

  return (
    <>
      {repos.map((el: IRepo) => (
        <Card el={el} key={el.id} />
      ))}
    </>
  )
}

export default RepoList
