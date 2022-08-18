import RoomHeader from "./RoomHeader"
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useVideoList } from "../core/query"
import { useMemo } from "react"
import VideoGroup from "./VideoGroup"
import { useRecoilState } from 'recoil'
import { videoPlayOpenAtom } from '../core/Atom'

interface PropsCenter {
  room: Room
  roomId: string
  openMenu: boolean
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  openAddCard: () => void
}

const RoomContentCenter = ({room, roomId, openMenu, setOpenMenu, openAddCard}: PropsCenter) => {
  const {
    videoList,
    groupByWithFilter,
  } = useVideoList(roomId)
  const videoGroupEntries:[string, Video[]][] = useMemo(
    () => Object.entries(groupByWithFilter()),
    [videoList],
  )
  // console.log('videoList:', videoList)
  // console.log('videoGroupEntries:', videoGroupEntries)
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)
  return (
    <div className="room-content-center-layout">
      <RoomHeader 
        title={room?.name} 
        toggle={openMenu} 
        setToggle={setOpenMenu}
      />
      <div className="room-content-center">
        <div>
          {videoGroupEntries.map(([groupName, videoList]) => (
            <VideoGroup
              key={groupName}
              category={groupName}
              videoList={videoList}
            />
          ))}
        </div>
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