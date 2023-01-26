import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCaseCollection } from 'api/mutation/createCaseCollection'
import { useState } from 'react'

export default function ModalCreate({ id }: any) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const queryClient = useQueryClient()
  const [req, setReq] = useState({})
  const idCollection = id

  const addCase = useMutation({
    mutationFn: (id: string) => createCaseCollection(req, idCollection),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary text-white" onClick={handleOpen}>
        Create
      </button>
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
          <div className="grid grid-rows-2 gap-16">
            {/* <div className="flex flex-row">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Req Header:
              </Typography>
              <TextField className="h-4 w-80 pl-8 pt-4" id="outlined-basic" variant="outlined" />
            </div> */}
            {/* <div className="flex flex-row gap-12">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Req Header:
              </Typography>
              <TextField
                onChange={(event) => {
                  setReq(event.target.value)
                }}
                className="ml-[-16px]"
                multiline
                rows={5}
                maxRows={Infinity}
              />
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
                rows={5}
                maxRows={Infinity}
              />
            </div>
            <div className="flex justify-end pt-8">
              <Button
                onClick={() => {
                  addCase.mutate('')
                }}
                className="bg-secondary hover:bg-secondary-500 m-4 h-max rounded font-bold text-white"
                size="small"
                variant="outlined"
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
