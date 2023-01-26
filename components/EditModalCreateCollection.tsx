import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editCaseCollection } from 'api/mutation/editCaseCollection'
import { getCollectionById } from 'api/queries/getCollectionById'
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'

const initialFormValues = { name: '', endpoint: '', method: '' }

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

interface EditModalCreateCollectionProps {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditModalCreateCollection({ id, open, setOpen }: EditModalCreateCollectionProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollectionById(id),
    enabled: !!id,
    onSuccess(data) {
      console.log('data pppp', data)
    },
  })
  const [data2, setData2] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData2(data.result.data)
      })
  }, [])

  const [form, setForm] = useState<typeof initialFormValues>(data ? data : initialFormValues)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => editCaseCollection(form, id),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })

  const handleChangeMethod = (event: SelectChangeEvent<string>) => {
    setForm((prev) => ({
      ...prev,
      method: event.target.value,
    }))
  }

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm((prev) => ({
      ...prev,
      name: event.target.value,
    }))
  }

  const handleChangeEndpoint: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm((prev) => ({
      ...prev,
      endpoint: event.target.value,
    }))
  }

  const handleSubmit = () => {
    // mutation.mutate('')
    // setForm(initialFormValues)
    console.log()
  }

  if (!data) return <div>loading.....</div>
  // if (isLoading) return <div>loading...</div>
  // if (error) return <div>error</div>

  return (
    <Modal open={open} onClose={setOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="grid grid-rows-4 gap-12">
          <div className="flex flex-row gap-4">
            <div>Name: </div>
            <TextField
              name="name"
              onChange={handleChangeName}
              defaultValue={data?.name}
              required
              id="outlined-required"
              label="Required"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div>Endpoint: </div>
            <TextField
              name="endpoint"
              defaultValue={data?.endpoint}
              onChange={handleChangeEndpoint}
              required
              id="outlined-required"
              label="Required"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div>Method: </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={data?.method}
                label="Type"
                name="method"
                onChange={handleChangeMethod}
              >
                <MenuItem value={'GET'}>GET</MenuItem>
                <MenuItem value={'POST'}>POST</MenuItem>
                <MenuItem value={'PUT'}>PUT</MenuItem>
                <MenuItem value={'DELETE'}>DELETE</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-end">
              <Button
                type="button"
                className=" rounded bg-red-500 font-bold text-white hover:bg-red-700"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                className=" rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
