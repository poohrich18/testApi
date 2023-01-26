import { useQuery } from '@tanstack/react-query'
import { getHistoryById } from 'api/queries/getHistoryById.'
import CollectionTest from 'components/CollectionTest'
import Layout from 'components/Layout'
import Tabs from 'components/Tabs'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { siteSettings } from 'settings'

const ShowTestDetail = () => {
  const router = useRouter()
  const id = router?.query?.id
  // const { data, isLoading, isFetching, error } = useQuery({
  //   queryKey: ['collections'],
  //   queryFn: fetchPosts,
  //   keepPreviousData: true,
  //   enabled: !!id,
  // })
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getHistoryById(id as string),
    keepPreviousData: true,
    enabled: !!id,
  })

  const getFromStorage = async (key: string) => {
    if (typeof window !== 'undefined') return localStorage.getItem(key) ? true : false
    return false
  }

  // useEffect(() => {
  //   getFromStorage('auth').then((auth) => {
  //     if (!auth) router.push('/')
  //   })
  // }, [])

  // if (isLoading || isFetching) return <p>Loading...</p>
  if (error) return <p>Failed to fetch...</p>

  // console.log('router: ', router.query.id)

  const tabs = siteSettings(id as string)
  // const tabs = siteSettings(router?.query?.id)
  // console.log('file: show-test-detail.tsx:12 ~ ShowTestDetail ~ tabs', tabs)

  return (
    <div className="my-4 sm:my-6">
      <Tabs tabs={tabs.tabsNavigation.menu}></Tabs>
      <CollectionTest id={id} data={data} />
    </div>
  )
}

ShowTestDetail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default ShowTestDetail
function getFromStorage(arg0: string) {
  throw new Error('Function not implemented.')
}
