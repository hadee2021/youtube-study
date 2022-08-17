import { useRoom } from '../core/query'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import RoomMenu from '../components/Setting/RoomMenu'
import RoomContentForm from '../components/RoomContentForm'
import RoomContentCenter from '../components/RoomContentCenter'
import { useRecoilState } from 'recoil'
import { openFormAtom, videoPlayOpenAtom } from '../core/Atom'
import VideoPlay from '../components/VideoPlay'

const Room = () => {
  const { id: roomId = '' } = useParams()
  const { room } = useRoom(roomId)
  console.log('room:', room)

  const[openMenu, setOpenMenu] = useState(false)
  const[openForm, setOpenForm] = useRecoilState(openFormAtom)
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)

  const openAddCard = () => {
    setOpenForm(true)
  }

  // 방 id 없으면 홈으로
  if (!roomId) {
    return <Navigate to="/" />
  }
  return (
    <div className={openMenu || openVideoPlay ? "modal-background" : ""}>
      {
        openForm
        ? 
        <RoomContentForm 
          openForm={openForm}
          setOpenForm={setOpenForm}
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
      {
        openVideoPlay &&
        <VideoPlay />
      }
    </div>
  )
}

export default Room