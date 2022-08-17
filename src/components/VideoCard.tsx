import { Card, CardContent,
  IconButton, Box, Typography
} from '@mui/material'
import { EditOutlined, YouTube as YouTubeIcon } from '@mui/icons-material'
import VideoModal from './VideoModal'
import { useRecoilState } from 'recoil'
import { openFormAtom, videoPlayOpenAtom, VideoDataAtom } from '../core/Atom'
import { useState } from 'react'

interface PropsVideoCard {
  video: Video
}

const VideoCard = ({video}: PropsVideoCard) => {
  const [open, setOpen] = useState(false)
  const[openForm, setOpenForm] = useRecoilState(openFormAtom)
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
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
              <IconButton
                size="small" 
                color="secondary"
                onClick={() => openVideoDetail(video)}
              >
                <EditOutlined fontSize="small"/>
              </IconButton>
            </Box>
            <Box className="video-card-center">
              <Typography fontWeight="bold">
                {video.title}
              </Typography>
              <IconButton
                onClick={openVideo}
              >
                {/* <VideoModal
                  consumer='youtube'
                  title={video.title}
                  content={video.youtube}
                /> */}
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