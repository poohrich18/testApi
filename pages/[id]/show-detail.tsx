import { useQuery } from '@tanstack/react-query'
import { getCollectionById } from 'api/queries/getCollectionById'
import CollectionDetail from 'components/CollectionDetail'
import Layout from 'components/Layout'
import Tabs from 'components/Tabs'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { siteSettings } from 'settings'

const ShowDetail = () => {
  const router = useRouter()
  const id = router?.query?.id

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollectionById(id as string),
    keepPreviousData: true,
    enabled: !!id,
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

  const tabs = siteSettings(id as string)

  return (
    <div className="my-4 sm:my-6">
      <Tabs tabs={tabs.tabsNavigation.menu} />
      <CollectionDetail data={data} id={id} />
    </div>
  )
}

ShowDetail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default ShowDetail
