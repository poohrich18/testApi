import axios from 'axios'

export const login = async (payload: { username: string; password: string }) => {
  return axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/login', payload)
}
