import { useEffect } from 'react'

const useScrollLoadMore = (loadMore: () => void) => {
  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as Document
      if (
        target.documentElement.scrollHeight -
          (target.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        loadMore()
      }
    }

    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [loadMore])
}

export default useScrollLoadMore
