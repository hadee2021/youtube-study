import { Card, CardContent,
  IconButton, Box, Typography
} from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import VideoModal from './VideoModal'

interface PropsVideoCard {
  video: Video
}

const VideoCard = ({video}: PropsVideoCard) => {
  
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
                // onClick={() => openVideoDetail(video)}
              >
                <EditOutlined fontSize="small"/>
              </IconButton>
            </Box>
            <Box className="video-card-center">
              <Typography fontWeight="bold">
                {video.title}
              </Typography>
              <IconButton>
                <VideoModal
                  consumer='youtube'
                  title={video.title}
                  content={video.youtube}
                />
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