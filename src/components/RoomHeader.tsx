import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { Menu, Clear }from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import { roomHeaderConsumerAtom } from '../core/Atom'
import { useRecoilState } from 'recoil'

interface Props {
  consumer?: string,
  title?: string,
  toggle: boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  onSave?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}
const RoomHeader = ({ consumer, title = '', toggle, setToggle, onSave }: Props) => {
  const[roomHeaderConsumer, setRoomHeaderConsumer] = useRecoilState(roomHeaderConsumerAtom)
  const onClickSave = () => {
    if(onSave === undefined) return
    onSave()
    console.log('추가')
    setToggle(!toggle)
  }
  const goToBack = () => {
    setToggle(!toggle)
    setRoomHeaderConsumer('')
  }
  
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className = {consumer === 'addCard' ? 'add-card-header' : ''}>
          { roomHeaderConsumer === '' &&
            <>
              <IconButton onClick={goToBack}>
                <Menu htmlColor="white"/>
              </IconButton>
              <Typography>
                {title}
              </Typography>
            </>
          }
          { roomHeaderConsumer === 'addCard' &&
            <>
            <IconButton onClick={goToBack}>
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
          }
          { roomHeaderConsumer === 'updateCard' &&
            <>
            <IconButton onClick={goToBack}>
              <Clear htmlColor="white"/>
            </IconButton>
            <Typography>
              커리큘럼 수정
            </Typography>
            <div className="save-btn">
              <IconButton onClick={onClickSave}>
                <SaveIcon htmlColor="white"/>
              </IconButton>
            </div>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default RoomHeader