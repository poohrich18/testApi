import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from 'api/queries/getPosts'
import Layout from 'components/Layout'
import ShowList from 'components/ShowList'
import { useRouter } from 'next/router'
import { useEffect, type ReactElement } from 'react'

const List = () => {
  const router = useRouter()

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchPosts,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const getFromStorage = async (key: string) => {
    if (typeof window !== 'undefined') return localStorage.getItem(key) ? true : false
    return false
  }

  useEffect(() => {
    getFromStorage('auth').then((auth) => {
      if (!auth) router.push('/')
    })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to fetch...</p>

  return (
    <>
      {data ? <ShowList posts={data} /> : null}
      {/* <Button type="button" variant="text" onClick={() => deleteCollectionMutation.mutate('63abffc17cfaafee35271aae')}>
        Submit Post
      </Button> */}
    </>
  )
}

List.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default List
