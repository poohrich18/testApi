import axios from 'axios'

export const fetchPosts = async () => {
  const result = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections')
  return result.data.result.data
}
