import { useForm } from 'react-hook-form'
import { Box, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import { YouTube as YouTubeIcon } from '@mui/icons-material'
import PopupState from 'material-ui-popup-state'

interface PropsYoutube {
  youtube: string
}

const EmbedYouTube = ({ youtube }: PropsYoutube) => {
  const {
    register,
    handleSubmit,
  } = useForm<{ youtube: string }>({
    defaultValues: { youtube },
  })
  console.log('youtube', youtube)
  return (
    <Box>
      {youtube && (
        <YouTube
          title="유튜브"
          videoId={getVideoId(youtube).id ?? ''}
          opts={{
            width: '100%',
            height: '300px',
          }}
        />
      )}
      <PopupState variant="popper">
        {popupState => {
          const onSave = handleSubmit(() => {
            popupState.close()
          })
          return (
            <>
            <Button
              sx={{ backgroundColor: '#D32F2F', mt: 3 }}
              variant="contained" 
              size="large"
              fullWidth
              onClick={popupState.open}
            >
              <YouTubeIcon fontSize="large" />
            </Button>
            <Dialog
              open={popupState.isOpen}
            >
              <DialogTitle fontWeight="bold">
                YouTube 링크
              </DialogTitle>
              <DialogContent>
                <TextField
                  placeholder="e.g) https://www.youtube.com/watch?v=..."
                  variant="standard" 
                  fullWidth
                  {...register('youtube', {
                    validate (link) {
                      const trimmed = link.trim()
                      if (!trimmed) return undefined
                      const { id, service } = getVideoId(trimmed)
                      if (!id || service !== 'youtube') {
                        return '정상적인 YouTube 동영상 주소를 입력해주세요.'
                      }
                      return undefined
                    }
                  })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={popupState.close}>
                  닫기
                </Button>
                <Button
                  variant="contained"
                  onClick={onSave}
                >
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </>
          )
        }}
      </PopupState>
    </Box>
  )
}

export default EmbedYouTube