import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { Menu, Clear }from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  consumer?: string,
  title?: string,
  toggle: boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  onSave?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}
const RoomHeader = ({ consumer, title = '', toggle, setToggle, onSave }: Props) => {
  
  const onClickSave = () => {
    if(onSave === undefined) return
    onSave()
    console.log('추가')
    setToggle(!toggle)
  }
  
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className = {consumer === 'addCard' ? 'add-card-header' : ''}>
          {
            consumer === 'addCard'
            ? 
            <>
              <IconButton onClick={() => setToggle(!toggle)}>
                <Clear htmlColor="white"/>
              </IconButton>
              <Typography>
                새 커리큘럼 추가
              </Typography>
              <div className="save-btn">
                <IconButton onClick={onClickSave}>
                  <SaveIcon htmlColor="white"/>
                </IconButton>
              </div>
            </>
            : 
            <>
              <IconButton onClick={() => setToggle(!toggle)}>
                <Menu htmlColor="white"/>
              </IconButton>
              <Typography>
                {title}
              </Typography>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default RoomHeader