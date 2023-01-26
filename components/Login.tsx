import { useMutation } from '@tanstack/react-query'
import { login } from 'api/mutation/login'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      localStorage.removeItem('auth')
    },
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        data.data.result.jwt && localStorage.setItem('auth', 'true')
        router.push('/list')
      }
    },
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="bg-beigh relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="bg-primary m-auto w-full rounded-md p-6 drop-shadow lg:max-w-xl">
        <h1 className="text-secondary text-center text-3xl font-bold uppercase drop-shadow ">Sign In</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="text-secondary block text-sm font-bold uppercase drop-shadow">
              Username
            </label>
            <input
              name="username"
              type="username"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring focus:ring-green-900 focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-secondary block text-sm font-bold uppercase drop-shadow">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring focus:ring-green-900 focus:ring-opacity-40"
            />
          </div>
          <div className="flex justify-center">
            <button className=" bg-secondary hover:bg-secondary-600 mt-8 inline-flex rounded py-2 px-4 font-bold text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
