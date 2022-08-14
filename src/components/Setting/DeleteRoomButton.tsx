import { 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, TextField
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import PopupState from 'material-ui-popup-state'

const DeleteRoomButton = () => {
  const navigate = useNavigate()
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