import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IRepo } from '../../types/repo'
import Card from './Card'

const RepoList = () => {
  const repos = useTypedSelector(state => state.repos)
  return (
    <>
    <div className="">
      {repos.map((el: IRepo) => (
        <Card el={el} key={el.id} />
      ))}
    </div>
    </>
  )
}

export default RepoList
