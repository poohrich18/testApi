import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from 'api/mutation/createPost'
import { useState } from 'react'

export default function ModalCreateCollection() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    method: '',
    endpoint: '',
  })
  const handleOpen = () => setOpen(true)
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      console.log('data: ', data)
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
    <div>
      <Button
        type="button"
        className="inline-flex rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleOpen}
      >
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="grid grid-rows-4 gap-12">
            <div className="flex flex-row gap-4">
              <div>Name: </div>
              <TextField onChange={handleChangeName} required id="outlined-required" label="Required" />
            </div>
            <div className="flex flex-row gap-4">
              <div>Endpoint: </div>
              <TextField onChange={handleChangeEndpoint} required id="outlined-required" label="Required" />
            </div>
            <div className="flex flex-row gap-4">
              <div>Method: </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
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
                className=" rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
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
    </div>
  )
}
