import axios from 'axios'

export const getCollectionById = async (id: string) => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${id}`)
    return result.data.result.data
  } catch (error) {
    console.log('error: ', error)
  }
}
