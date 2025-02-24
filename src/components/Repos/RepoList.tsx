import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IRepo } from '../../types/repo'
import Card from './Card'
import './repos.scss'

const RepoList = () => {
  const repos = useTypedSelector(state => state.repos)
  return (
    <>
    <div className="repos">
      {repos.map((el: IRepo, index:number) => (
        <Card el={el} index={index} key={el.id} />
      ))}
    </div>
    </>
  )
}

export default RepoList
