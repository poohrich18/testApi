import axios from 'axios'

export const createPost = async (payload: { name: string; endpoint: string; method: string }) => {
  return axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections', payload)
}
