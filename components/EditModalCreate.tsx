import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCaseCollection } from 'api/mutation/editCaseCollection'
import { useState } from 'react'

export default function EditModalCreate({ id, data, dataAll, index }: any) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const queryClient = useQueryClient()
  const [req, setReq] = useState(JSON.stringify(data))
  const idCollection = id
  console.log(dataAll, 'dataAll')
  console.log(index, 'index')

  const addCase = useMutation({
    mutationFn: (id: string) => editCaseCollection(dataAll, idCollection),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      console.log('data: ', data)
    },
  })

  const mapData = () => {
    dataAll.cases.splice(index, 1, JSON.parse(req))
    addCase.mutate('')
  }

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

  return (
    <div>
      <Button
        type="button"
        className="inline-flex rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="pb-8" id="modal-modal-title" variant="h6" component="h2">
            Test Payload
          </Typography>
          <div className="grid grid-rows-3 gap-8">
            {/* <div className="flex flex-row">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Req Header:
              </Typography>
              <TextField className="h-4 w-80 pl-8 pt-4" id="outlined-basic" variant="outlined" />
            </div> */}
            <div className="flex flex-row gap-12">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Req Body:
              </Typography>
              <TextField
                onChange={(event) => {
                  setReq(event.target.value)
                }}
                className=""
                multiline
                rows={2}
                maxRows={100}
                value={req}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  mapData()
                }}
                size="small"
                variant="outlined"
                className="h-max"
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
