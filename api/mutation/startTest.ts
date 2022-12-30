import axios from 'axios'

export const startTest = async (payload: { _id: string }) => {
  const result = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections/start', payload)
  return result.data.result.data
}
