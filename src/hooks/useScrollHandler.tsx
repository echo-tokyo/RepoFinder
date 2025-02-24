import { useEffect } from 'react'
import { IRepo } from '../types/repo'

const useScrollLoadMore = (loadMore: () => void, userdata: { public_repos: number }, repos: IRepo[]) => {
  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as Document
      if (
        target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
        100 && userdata.public_repos !== repos.length
      ) {
        loadMore()
      }
    }

    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore])
}

export default useScrollLoadMore