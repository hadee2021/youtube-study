import { Card, CardContent,
  IconButton, Box, Typography
} from '@mui/material'
import { EditOutlined, YouTube as YouTubeIcon, Close } from '@mui/icons-material'
import VideoModal from './VideoModal'
import { useRecoilState } from 'recoil'
import { openFormAtom, videoPlayOpenAtom, VideoDataAtom, videoUpdateAtom, roomHeaderConsumerAtom } from '../core/Atom'
import { useState } from 'react'
import { useDeleteVideo } from '../core/query'
import { useParams } from 'react-router-dom'

interface PropsVideoCard {
  video: Video
}

const VideoCard = ({video}: PropsVideoCard) => {
  const [open, setOpen] = useState(false)
  const[openForm, setOpenForm] = useRecoilState(openFormAtom)
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
  const[videoUpdate, setVideoUpdate] = useRecoilState(videoUpdateAtom)
  const[roomHeaderConsumer, setRoomHeaderConsumer] = useRecoilState(roomHeaderConsumerAtom)
  const openVideo = () => {
    setOpenVideoPlay(true)
    setVideoData({
      ...videoData,
      title: video.title,
      youtube: video.youtube
    })
  }
  const openVideoDetail = (video: Video) => {
    console.log('video:', video)
    setOpenForm(true)
    setVideoData({
      ...videoData,
      id: video.id as string,
      orderNumber: video.orderNumer,
      title: video.title,
      category:video.category,
      memo: video.memo,
      youtube: video.youtube
    })
    setVideoUpdate(true)
    setRoomHeaderConsumer('updateCard')
  }

  const { id: roomId = '' } = useParams()

  const {
    deleteVideo,
    isLoading: isDeleting,
  }= useDeleteVideo(roomId, video.id) //삭제

  const onDelete = () => {
    if (isDeleting) return
    deleteVideo()
  }


  return (
    <>
      <Card className="video-card">
        <CardContent>
          <Box>
            <Box className="video-card-header">
              <Typography fontWeight="bold">
                {video.orderNumer}
              </Typography>
              <Box>
                <IconButton
                  size="small" 
                  color="secondary"
                  onClick={() => openVideoDetail(video)}
                >
                  <EditOutlined fontSize="small"/>
                </IconButton>
                <IconButton
                  size="small"
                  onClick={onDelete}
                  sx={{marginLeft : 1}}
                >
                  <Close fontSize="small"/>
                </IconButton>
              </Box>
            </Box>
            <Box className="video-card-center">
              <Typography fontWeight="bold">
                {video.title}
              </Typography>
              <IconButton
                onClick={openVideo}
              >
                <YouTubeIcon fontSize="large" htmlColor="red"/>
              </IconButton>
            </Box>
            <Box className="video-card-footer">
              <Typography className="video-card-str-btn">
                <a href={`${video.youtube}`} target="_blank">유튜브 이동</a>
              </Typography>
              <VideoModal
                label="메모"
                title="메모"
                content={video.memo}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default VideoCard