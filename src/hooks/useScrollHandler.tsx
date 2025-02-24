import { useEffect, useRef } from 'react'
import { IRepo } from '../types/repo'
import { IUserData } from '../types/query'

const useScrollLoadMore = (
  loadMore: () => void,
  userData: IUserData,
  repos: IRepo[],
  isFetching: boolean,
) => {
  const isLoadingRef = useRef(false)

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as Document
      const nearBottom =
        target.documentElement.scrollHeight -
          (target.documentElement.scrollTop + window.innerHeight) <
        100

      if (
        nearBottom &&
        repos.length < userData.public_repos &&
        !isLoadingRef.current
      ) {
        isLoadingRef.current = true
        loadMore()
      }
    }

    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [loadMore, userData, repos.length])

  useEffect(() => {
    if (!isFetching) {
      isLoadingRef.current = false
    }
  }, [isFetching])
}

export default useScrollLoadMore
