import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import {  YouTube as YouTubeIcon } from '@mui/icons-material'

interface PropsVideoModal {
  label?: string
  title: string
  content: string
  consumer?: string
}

const VideoModal = ({label, title, content, consumer}:PropsVideoModal) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        size="medium"
        onClick={() => setOpen(true)}
      >
        {
          consumer
          ? <YouTubeIcon fontSize="large" htmlColor="red"/>
          : label
        }
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
            {consumer
              ?
              <YouTube
                title="유튜브"
                videoId={getVideoId(content).id ?? ''}
                opts={{
                  width: '100%',
                  height: '400px',
                }}
              />
              : content
            }
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