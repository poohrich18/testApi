import { getCollectionById } from 'api/queries/getCollectionById'
import axios from 'axios'

export const createCaseCollection = async (payload: any, id: string) => {
  const result = await getCollectionById(id)
  result.cases.push(JSON.parse(payload))
  return axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections/edit', result)
}
