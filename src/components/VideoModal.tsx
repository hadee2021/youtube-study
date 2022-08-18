import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

interface PropsVideoModal {
  label?: string
  title: string
  content: string
}

const VideoModal = ({label, title, content}:PropsVideoModal) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        size="medium"
        onClick={() => setOpen(true)}
      >
        { label }
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogContent className="dialog-modal">
            { content }
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              onClick={() => setOpen(false)}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default VideoModal