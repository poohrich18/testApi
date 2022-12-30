import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCollection } from 'api/mutation/deleteCollection'
import { fetchPosts } from 'api/queries/getPosts'
import Layout from 'components/Layout'
import ShowList from 'components/ShowList'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const List = () => {
  const router = useRouter()
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchPosts,
    keepPreviousData: true,
  })

  const queryClient = useQueryClient()
  // const mutation = useMutation({
  //   mutationFn: createPost,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ['collections'] })
  //     console.log('data: ', data)
  //   },
  // })

  const deleteCollectionMutation = useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      console.log('data2: ', data)
    },
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

  if (isLoading || isFetching) return <p>Loading...</p>
  if (error) return <p>Failed to fetch...</p>

  return (
    <>
      <ShowList posts={data} deleteCollectionMutation={deleteCollectionMutation} />
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
