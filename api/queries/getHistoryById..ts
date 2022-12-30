import axios from 'axios'

export const getHistoryById = async (id: string) => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/history/collection/${id}`)
    return result.data.result
  } catch (error) {
    console.log('error: ', error)
  }
}
