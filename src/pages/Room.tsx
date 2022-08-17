import { useRoom } from '../core/query'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import RoomMenu from '../components/Setting/RoomMenu'
import RoomContentForm from '../components/RoomContentForm'
import RoomContentCenter from '../components/RoomContentCenter'

const Room = () => {
  const { id: roomId = '' } = useParams()
  const { room } = useRoom(roomId)
  console.log('room:', room)

  const[openMenu, setOpenMenu] = useState(false)
  const[openAdd, setOpenAdd] = useState(false)

  const openAddCard = () => {
    setOpenAdd(true)
  }

  // 방 id 없으면 홈으로
  if (!roomId) {
    return <Navigate to="/" />
  }
  return (
    <div className={openMenu ? "modal-background" : ""}>
      {
        openAdd
        ? 
        <RoomContentForm 
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
        />
        :
        <RoomContentCenter 
          room={room}
          roomId={roomId}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openAddCard={openAddCard}
        />
      }
      {
        openMenu &&
        <RoomMenu />
      }
    </div>
  )
}

export default Room