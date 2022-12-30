import axios from 'axios'

export const deleteCollection = async (id: string) => {
  return axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT + `/collections/${id}`)
}
