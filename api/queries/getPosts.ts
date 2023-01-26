import axios from 'axios'

interface RootObject {
  result: Result
}

interface Result {
  data: Datum[]
}

export interface Datum {
  _id: string
  name: string
  endpoint: string
  method: string
  created_at: string
  updated_at: string
  __v: number
  cases: (Case | Cases2 | Cases3 | Cases4)[]
}

interface Cases4 {}

interface Cases3 {
  name: string
  response: Response3
}

interface Response3 {
  message?: string
  status?: string
  time?: Time
  disclaimer?: string
  chartName?: string
  bpi?: Bpi
}

interface Cases2 {
  name: string
  response: Response2
}

interface Response2 {
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

interface Case {
  name: string
  response: Response
  options: Option[]
}

interface Option {
  name: string
  type: string
  operators: Operator[]
}

interface Operator {
  symbol: string
}

interface Response {
  message: string
  status: string
}

export const fetchPosts = async (): Promise<Datum[]> => {
  const result = await axios.get<RootObject>(process.env.NEXT_PUBLIC_API_ENDPOINT + '/collections')
  return result.data.result.data
}
