import { useRouter } from 'next/router'
import ModalCreateCollection from './ModalCreateCollection'

export default function ShowList({ posts, deleteCollectionMutation }: any) {
  console.log(posts, 'Dfsdfdsfs')
  const router = useRouter()
  return (
    <div className="p-8 ">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-8">
          <div>
            <div className="p-2 text-xl">Collection</div>
            <div className="font-sans-serif-300 text-base">add testcase condition</div>
          </div>
          <ModalCreateCollection />
        </div>
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
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {posts.map((posts: any) => (
                    <tr key={posts._id}>
                      <td
                        className="cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-400 text-gray-900 underline"
                        onClick={() => {
                          router.push(`/${posts._id}/show-detail`)
                        }}
                      >
                        {posts._id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.method}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{posts.updated_at}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button
                          className="text-red-700 hover:text-indigo-900"
                          onClick={() => deleteCollectionMutation.mutate(posts._id)}
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
  )
}
