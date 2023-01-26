import { Button, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { startTest } from 'api/mutation/startTest'
import { useState } from 'react'
import ModalViewHistory from './ModalViewHistory'

export default function CollectionTest({ id, data }: any) {
  const [text, setText] = useState<string>()
  const [resultTest, setResultTest] = useState<string>()
  const queryClient = useQueryClient()
  const idCollection = id

  const startTestButton = useMutation({
    mutationFn: startTest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      setResultTest(data)
    },
  })
  // const startTestMain = () => {
  //   setResultTest('Wakakaaa')
  // }

  return (
    <section className="bg-primary flex flex-col gap-4 rounded backdrop-blur-lg">
      <div className="flex w-full items-center justify-between px-4 pt-6 ">
        <h1 className="text-2xl font-bold uppercase leading-none tracking-wider text-white">Test</h1>
        <ModalViewHistory id={idCollection} />
      </div>
      <hr className="mx-4 rounded-full border-t-white/5 shadow shadow-black/5" />
      <div className="flex flex-col">
        {/* <div className="m-4 p-8 pl-20 text-start text-3xl font-bold">Test</div> */}
        <div className="m-12 flex flex-col gap-12 p-4">
          {/* <div className="">
            <h2 className="pl-12 text-start  text-2xl">History</h2>
          </div> */}

          <form className="mt-2 flex flex-col justify-start px-4">
            <div className="mb-4 flex flex-col">
              <h2 className="mb-2 text-2xl font-semibold text-white">Dttm</h2>
              <TextField id="outlined-basic" className="bg-white" variant={undefined} value={resultTest} disabled />
            </div>
          </form>
          <div className="flex justify-center">
            {/* <div>
              <h2 className="pl-12 text-start text-2xl  ">Dttm :</h2>
            </div>
            <h2 className="text-start text-xl font-bold text-blue-500">{resultTest}</h2> */}

            <Button
              type="button"
              className="btn btn-secondary text-white"
              onClick={() => {
                startTestButton.mutate({
                  _id: idCollection,
                })
              }}
              variant="outlined"
            >
              start test
            </Button>
            {/* <ModalCreate /> */}
          </div>
        </div>
      </div>
    </section>
  )
}
