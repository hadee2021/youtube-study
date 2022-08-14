import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'

const ExitRoomButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      sx={{ backgroundColor: '#22C55E' }}
      variant="contained" 
      size="large"
      onClick={ () => { navigate('/')} }
      startIcon={<DirectionsRunIcon />}
      fullWidth
    >
      방 종료
    </Button>
  )
}

export default ExitRoomButton