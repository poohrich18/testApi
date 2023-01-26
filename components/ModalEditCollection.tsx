import { CircularProgress, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCaseCollection } from 'api/mutation/editCaseCollection'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface EditModalCreateCollectionProps {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalEditCollection({ id, open, setOpen }: EditModalCreateCollectionProps) {
  const [form, setForm] = useState({
    name: '',
    method: '',
    endpoint: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const handleClose = () => setOpen(false)

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

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => editCaseCollection(data, id),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })

  const handleChangeMethod = (event: any) => {
    setForm((prev) => ({
      ...prev,
      method: event.target.value,
    }))
  }
  const handleChangeName = (event: any) => {
    setForm((prev) => ({
      ...prev,
      name: event.target.value,
    }))
  }
  const handleChangeEndpoint = (event: any) => {
    setForm((prev) => ({
      ...prev,
      endpoint: event.target.value,
    }))
  }

  const [data, setData] = useState<any>()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.result.data)
        setForm({
          name: data.result.data.name,
          endpoint: data.result.data.endpoint,
          method: data.result.data.method,
        })
        setIsLoading(false)
      })
  }, [id])

  console.log(data, 'data')

  const handleSubmit = () => {
    data.name = form.name
    data.endpoint = form.endpoint
    data.method = form.method
    mutation.mutate('')
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {' '}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="grid grid-rows-4 gap-12">
                <div className="flex flex-row gap-4">
                  <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
                    Name:{' '}
                  </div>
                  <TextField
                    fullWidth
                    className="ml-12"
                    onChange={handleChangeName}
                    defaultValue={data.name}
                    required
                    id="outlined-required"
                    label="Required"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
                    Endpoint:{' '}
                  </div>
                  <TextField
                    fullWidth
                    onChange={handleChangeEndpoint}
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue={data.endpoint}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
                    Method:{' '}
                  </div>
                  {/* <Box sx={{ minWidth: 120 }}> */}
                  <FormControl fullWidth>
                    <InputLabel className="ml-4" variant="standard" htmlFor="uncontrolled-native">
                      Maethod
                    </InputLabel>
                    <NativeSelect
                      className="ml-4"
                      fullWidth
                      onChange={handleChangeMethod}
                      defaultValue={data?.method}
                      inputProps={{
                        name: 'maethod',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={'GET'}>GET</option>
                      <option value={'POST'}>POST</option>
                      <option value={'PUT'}>PUT</option>
                      <option value={'DELETE'}>DELETE</option>
                    </NativeSelect>
                  </FormControl>
                  {/* </Box> */}
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="m-4 rounded bg-red-500 font-bold text-white hover:bg-red-700"
                    onClick={() => setOpen(false)}
                  >
                    CLOSE
                  </Button>
                  <Button
                    type="button"
                    className="bg-primary hover:bg-primary-700 m-4 rounded font-bold text-white"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </div>
  )
}
