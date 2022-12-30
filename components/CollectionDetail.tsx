import { Chip, TextField } from '@mui/material'
import EditModalCreate from './EditModalCreate'
import ModalCreate from './ModalCreate'

export default function CollectionDetail({ data, id }: any) {
  console.log(data, 'dataDetail')
  const a = data
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="m-4 ml-28 flex justify-start p-4 text-2xl">Detail</div>
        <div className="ml-20 flex justify-start">
          <div className="flex flex-col gap-16 p-12">
            <div className="flex flex-row gap-4">
              <div>1. TriggerURL</div>
              <TextField
                className="h-4 w-80"
                id="outlined-basic"
                variant="outlined"
                value={data?.endpoint}
                disabled={true}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div>2. Method</div>
              <TextField
                className="h-2 w-80 pl-8"
                id="outlined-basic"
                variant="outlined"
                value={data?.method}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="ml-24 flex flex-row">
          <div className="p-4 text-xl">Use Case</div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-4">
              <div className="p-4">
                <ModalCreate id={id}></ModalCreate>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-28 flex flex-col gap-4">
          {data.cases.map((set: any, index: number) => {
            const payload = data.cases[index]
            return (
              <>
                <div className="flex flex-row gap-8">
                  <Chip className="w-max" label={`${index + 1}. ${set.name}`} />
                  <EditModalCreate data={payload} id={id} dataAll={data} index={index}></EditModalCreate>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
