import axios from 'axios'

export const editCaseCollection = async (payload: any, id: string) => {
  return axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections/edit', payload)
}
