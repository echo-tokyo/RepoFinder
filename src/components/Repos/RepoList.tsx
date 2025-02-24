import { IRepo } from '../../types/repo'
import Card from './Card'

const RepoList = ({ repos }: { repos: IRepo[] }) => {
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
