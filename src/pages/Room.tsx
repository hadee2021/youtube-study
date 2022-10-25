import { useRoom } from '../core/query'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import RoomMenu from '../components/Setting/RoomMenu'
import RoomContentForm from '../components/RoomContentForm'
import RoomContentCenter from '../components/RoomContentCenter'
import { useRecoilState } from 'recoil'
import { openFormAtom, videoPlayOpenAtom, VideoDataAtom, roomHeaderConsumerAtom } from '../core/Atom'
import VideoPlay from '../components/VideoPlay'

const Room = () => {
  const { id: roomId = '' } = useParams()
  const { room } = useRoom(roomId)

  const[openMenu, setOpenMenu] = useState(false)
  const[openForm, setOpenForm] = useRecoilState(openFormAtom)
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
  const[roomHeaderConsumer, setRoomHeaderConsumer] = useRecoilState(roomHeaderConsumerAtom)
  const openAddCard = () => {
    setOpenForm(true)
    setVideoData({
      ...videoData,
      id:'',
      orderNumber:0,
      title: '',
      category:'',
      memo:'',
      youtube:'',
      complete: false
    })
    setRoomHeaderConsumer('addCard')
  }

  // 방 id 없으면 홈으로
  if (!roomId) {
    return <Navigate to="/" />
  }
  return (
    <div>
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
        <div className="room-menu-modal-wrapper">
          <RoomMenu />
        </div>
      }
      
      
      
      {
        openVideoPlay &&
        <div className="play-modal-wrapper">
          <VideoPlay />
        </div>
      }
      
    </div>
  )
}

export default Room