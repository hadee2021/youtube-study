import { 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, TextField
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import PopupState from 'material-ui-popup-state'
import { useDeleteRoom, useRoom } from '../../core/query'
import { useForm } from 'react-hook-form'
import { hash } from '../../core/util'

const DeleteRoomButton = () => {
  const { id: roomId = '' } = useParams()
  const { room } = useRoom(roomId)
  const { deleteRoom } = useDeleteRoom(roomId)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '' },
  })

  const onClickDelete = handleSubmit(() => {
    if (!roomId) return
    deleteRoom({
      onSuccess () {
        navigate('/', { replace: true, state: { exit: true } })
      },
    })
  })

  return (
    <PopupState variant="popover">
      {popupState => (
        <>
          <Button
            sx={{ backgroundColor: '#D32F2F', mt: 3 }}
            variant="contained" 
            size="large"
            startIcon={<DeleteIcon />}
            fullWidth
            onClick={popupState.open}
          >
            방 삭제하기
          </Button>
          <Dialog open={popupState.isOpen}>
            <DialogTitle>
              방 삭제하기
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                이 방을 삭제합니다
              </DialogContentText>
              <DialogContentText>
                방과 커리큘럼이 영구적으로 제거됩니다.
              </DialogContentText>
              <TextField
                type="password"
                fullWidth
                label="방 생성 비밀번호"
                {...register('password', {
                  validate (password) {
                    return room?.pwd !== hash(password)
                      ? '열쇠가 틀립니다.'
                      : undefined
                  }
                })}
                error={Boolean(errors?.password)}
                helperText={errors?.password?.message}
              />
              <DialogActions>
                <Button 
                  size="large" 
                  onClick={popupState.close}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained" 
                  size="large"
                  color="error"
                  onClick={onClickDelete}
                >
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </>
      )}
    </PopupState>
    
  )
}

export default DeleteRoomButton