import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from 'api/mutation/createPost'
import { Dispatch, SetStateAction, useState } from 'react'

export default function ModalCreateCollection({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [form, setForm] = useState({
    name: '',
    method: '',
    endpoint: '',
  })

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
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      setOpen(false)
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" grid grid-rows-4 gap-12">
          <div className="flex flex-row gap-4">
            <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
              Name:{' '}
            </div>
            <TextField
              className="ml-12"
              fullWidth
              onChange={handleChangeName}
              required
              id="outlined-required"
              label="Required"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
              Endpoint:{' '}
            </div>
            <TextField fullWidth onChange={handleChangeEndpoint} required id="outlined-required" label="Required" />
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-primary m-4 text-xl font-bold uppercase leading-none tracking-wider drop-shadow">
              Method:{' '}
            </div>
            <FormControl fullWidth>
              <InputLabel className="ml-4" id="demo-simple-select-label">
                Type
              </InputLabel>
              <Select
                className="ml-4"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.method}
                label="Type"
                onChange={handleChangeMethod}
              >
                <MenuItem value={'GET'}>GET</MenuItem>
                <MenuItem value={'POST'}>POST</MenuItem>
                <MenuItem value={'PUT'}>PUT</MenuItem>
                <MenuItem value={'DELETE'}>DELETE</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              className="bg-primary hover:bg-primary-700 m-4 inline-flex rounded py-2 px-4 font-bold text-white drop-shadow"
              onClick={() =>
                mutation.mutate({
                  name: form.name,
                  endpoint: form.endpoint,
                  method: form.method,
                })
              }
            >
              Submit
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
