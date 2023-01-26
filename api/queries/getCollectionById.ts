import axios from 'axios'

interface RootObject {
  result: Result
}

interface Result {
  data: DataType
}

export interface DataType {
  _id: string
  name: string
  endpoint: string
  method: string
  cases: Case[]
  created_at: string
  updated_at: string
  __v: number
}

interface Case {
  name: string
  response: Response
}

interface Response {
  time: Time
  disclaimer: string
  chartName: string
  bpi: Bpi
}

interface Bpi {
  USD: USD
  GBP: USD
  EUR: USD
}

interface USD {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

interface Time {
  updated: string
  updatedISO: string
  updateduk: string
}

export const getCollectionById = async (id: string): Promise<any> => {
  try {
    const result = await axios.get<RootObject>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${id}`)
    return result.data.result.data
  } catch (error) {
    console.log('error: ', error)
  }
}
