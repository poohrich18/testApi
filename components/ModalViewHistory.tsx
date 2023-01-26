import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ModalViewHistory({ id }: any) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const queryClient = useQueryClient()
  const [req, setReq] = useState({})
  const [data, setData] = useState([])
  const moment = require('moment')
  const router = useRouter()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
  }
  const a: any = []

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/history/collection/${id}`
      const result = await axios(url)
      setData(result.data.result.data)
    }
    fetchData()
  }, [id])

  console.log(data, 'dataResault')
  if (!data) return <div>loading</div>

  return (
    <div>
      <Button
        type="button"
        className="inline-flex rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleOpen}
      >
        View History
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Result
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Method
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Endpoint
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Time test
                      </th>
                      {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                      {/* <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.map((posts: any) => (
                      <tr key={'dfsdfsd'}>
                        <td className=" whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-400 text-gray-900 underline">
                          {posts.result}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.method}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.endpoint}</td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.updated_at}</td> */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {moment(posts.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td> */}
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          {/* <button
                            className="text-red-700 hover:text-indigo-900"
                            onClick={() => deleteCollectionMutation.mutate(posts._id)}
                          >
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="flex justify-start">
                <Button
                  type="button"
                  className="m-4 rounded bg-red-500 font-bold text-white hover:bg-red-700"
                  onClick={() => setOpen(false)}
                >
                  CLOSE
                </Button>
              </div> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
