import { Chip, TextField } from '@mui/material'
import EditModalCreate from './EditModalCreate'
import ModalCreate from './ModalCreate'

export default function CollectionDetail({ data, id }: any) {
  return (
    <section className="bg-primary flex flex-col gap-4 rounded backdrop-blur-lg">
      <div className="flex w-full items-center justify-between px-4 pt-6 ">
        <h1 className="text-2xl font-bold uppercase leading-none tracking-wider text-white">Detail</h1>
        <ModalCreate id={id} />
      </div>
      <hr className="mx-4 rounded-full border-t-white/5 shadow shadow-black/5" />

      <form className="mt-6 flex flex-col justify-start px-4">
        <div className="mb-4 flex flex-col">
          <label className="mb-2 font-semibold text-white">TriggerURL</label>
          <TextField id="outlined-basic" className="bg-white" variant={undefined} value={data?.endpoint} disabled />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2 font-semibold text-white">Method</label>
          <TextField className="bg-white" id="outlined-basic" variant={undefined} value={data?.method} disabled />
        </div>
      </form>

      <div className="mt-4 flex w-full items-center justify-center px-4">
        <h1 className="text-2xl font-bold uppercase leading-none tracking-wider text-white">Use Case</h1>
        {/* <div className="mr-3 text-xl font-bold capitalize text-white">Use Case:</div> */}
      </div>
      <hr className="mx-4 rounded-full border-t-white/5 shadow shadow-black/5" />

      <div className="m-12 ml-28 flex flex-col gap-4">
        {data?.cases?.map((set: any, index: number) => {
          const payload = data.cases[index]
          return (
            <>
              <div className="mr-14 flex flex-row justify-center gap-8">
                <Chip className="bg-secondary w-max text-white" label={`${index + 1}. ${set.name}`} />
                <EditModalCreate data={payload} id={id} dataAll={data} index={index}></EditModalCreate>
              </div>
            </>
          )
        })}
      </div>
    </section>
  )
}
