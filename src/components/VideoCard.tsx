import { Card, CardContent,
  IconButton, Box, Typography, Tooltip
} from '@mui/material'
import { EditOutlined, YouTube as YouTubeIcon, Close } from '@mui/icons-material'
import VideoModal from './VideoModal'
import { useRecoilState } from 'recoil'
import { openFormAtom, videoPlayOpenAtom, VideoDataAtom, videoUpdateAtom, roomHeaderConsumerAtom } from '../core/Atom'
import { useDeleteVideo, useEditVideo } from '../core/query'
import { useParams } from 'react-router-dom'


interface PropsVideoCard {
  video: Video
}

const VideoCard = ({video}: PropsVideoCard) => {
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
    setOpenForm(true)
    setVideoData({
      ...videoData,
      id: video.id as string,
      orderNumber: video.orderNumer,
      title: video.title,
      category:video.category,
      memo: video.memo,
      youtube: video.youtube,
      complete: video.complete as boolean
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
    if(isDeleting) return
    deleteVideo()
  }

  // console.log('video', video)

  const {
    editVideo,
    isLoading: isCompleting
  }= useEditVideo(roomId, video.id)

  const onComplete = () => {
    if(isCompleting) return

    const nextVideoForm = {
      orderNumer: Number.parseInt(String(video.orderNumer), 10),
      title: video.title.trim(),
      category: video.category.trim(),
      memo: video.memo.trim(),
      youtube: video.youtube.trim(),
      complete: !video.complete,
    }

    editVideo(nextVideoForm)
  }


  return (
    <>
      <Card 
        className="video-card"
        sx={{ 
          backgroundColor : `${video.complete === true ? "rgba(0, 0, 0, 0.2)": "white" }`
        }}
      >
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
              <Tooltip title={video.title} placement="bottom">
                <Typography 
                  fontWeight="bold" 
                  className="video-card-center-title"
                  onClick={() => onComplete()}
                >
                  {video.title}
                </Typography>
              </Tooltip>
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