import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCollection } from 'api/mutation/deleteCollection'
import { Datum } from 'api/queries/getPosts'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ModalEditCollection from './ModalEditCollection'

const EditModalCreateCollection = dynamic(() => import('./EditModalCreateCollection'), { ssr: false })
const ModalCreateCollection = dynamic(() => import('./ModalCreateCollection'), { ssr: false })

interface ShowListProps {
  posts: Datum[]
}

export default function ShowList({ posts }: ShowListProps) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const deleteCollectionMutation = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['collections'] }),
  })

  const [id, setId] = useState('')
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const moment = require('moment')

  return (
    <>
      {editModal ? <ModalEditCollection id={id} open={editModal} setOpen={setEditModal} /> : null}
      {createModal ? <ModalCreateCollection open={createModal} setOpen={setCreateModal} /> : null}

      <div className="p-8">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between px-4 pt-6 ">
            <div>
              <div className="text-xl font-bold uppercase leading-none tracking-wider text-white drop-shadow">
                Collection
              </div>
              <div className=" drop-shadowmb-4 text-base font-bold uppercase leading-none tracking-wider text-white">
                add testcase condition
              </div>
            </div>
            <Button
              type="button"
              className="bg-primary hover:bg-primary-700 inline-flex rounded py-2 px-4 font-bold text-white drop-shadow"
              onClick={() => setCreateModal(true)}
            >
              Create
            </Button>
          </div>
          <hr className="mx-4 rounded-full border-t-white/5 shadow shadow-black/5" />
          {/* <div className="flex items-center justify-between py-8">
            <div>
              <div className="text-xl">Collection</div>
              <div className="font-sans-serif-300 text-base">add testcase condition</div>
            </div>
            <Button
              type="button"
              className="bg-primary inline-flex rounded py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setCreateModal(true)}
            >
              Create
            </Button>
          </div> */}
          <div className="-my-2 mt-6 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Name
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
                        Update At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Delete
                      </th>

                      {/* <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th> */}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {posts.length > 0 &&
                      posts.map((post) => (
                        <tr key={post._id}>
                          <td
                            className="cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-400 underline"
                            onClick={() => {
                              router.push(`/${post?._id}/show-detail`)
                            }}
                          >
                            {post._id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{post.method}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {moment(post.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                setId(post._id)
                                setEditModal(true)
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <button
                              className="text-red-700 hover:text-indigo-900"
                              onClick={() => deleteCollectionMutation.mutate(post._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
