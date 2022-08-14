import RoomHeader from "./RoomHeader"
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

interface PropsCenter {
  room: Room
  openMenu: boolean
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  openAddCard: () => void
}

const RoomContentCenter = ({room, openMenu, setOpenMenu, openAddCard}: PropsCenter) => {
  return (
    <div className="room-content">
      <RoomHeader 
        title={room?.name} 
        toggle={openMenu} 
        setToggle={setOpenMenu}
      />
      <div className="room-content-center">
        본문
      </div>
      {/* 양식 추가버튼 */}
      {
        openMenu
        ? ''
        : 
        <Fab
          color="primary"
          sx={{
            position :"fixed",
            right: 20,
            bottom: 20
          }}
          onClick={() => openAddCard()}
        >
          <Add fontSize="large" />
        </Fab>
      }
    </div>
  )
}

export default RoomContentCenter