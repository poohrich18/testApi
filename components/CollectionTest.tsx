import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { startTest } from 'api/mutation/startTest'
import { useState } from 'react'

export default function CollectionTest({ id }: any) {
  const [text, setText] = useState<string>()
  const [resultTest, setResultTest] = useState<string>()
  const queryClient = useQueryClient()
  const idCollection = id

  // const { data, isLoading, isFetching, error } = useQuery({
  //   queryKey: ['collections'],
  //   queryFn: () => getHistoryById(id as string),
  //   keepPreviousData: true,
  //   enabled: !!idCollection,
  // })
  // console.log('dataQwweweweHistory', data)

  const startTestButton = useMutation({
    mutationFn: startTest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      console.log('dataTest: ', data)
      setResultTest(data)
      console.log(resultTest, 'DSfdsfsdf')
    },
  })
  // const startTestMain = () => {
  //   setResultTest('Wakakaaa')
  // }
  console.log(resultTest, 'dsfsdfsdf')

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-start p-8 text-2xl">Test</div>
        <div className="m-12 flex flex-col gap-24 p-12">
          <div className="">History</div>
          <div className="flex flex-row gap-12">
            <div>Dttm:</div>
            <h2>{resultTest}</h2>

            <Button
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
    </>
  )
}
