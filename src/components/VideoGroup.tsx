import { Box, Collapse, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from "react"
import VideoCard from './VideoCard'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

interface VideoListProps {
  videoList: Video[]
}

function VideoList({videoList}: VideoListProps) {
  return (
    <Box>
      <Carousel responsive={responsive}>
        {videoList.map((video: Video) => (
            <VideoCard 
              key={video.id}
              video={video}
            />
        ))}
      </Carousel>
    </Box>
  )
}




interface PropsVideoGroup {
  category: string
  videoList: Video[]
}

const VideoGroup = ({category, videoList}:PropsVideoGroup) => {
  const [open, setOpen] = useState(true)
  console.log('category', category)
  console.log('videoList', videoList)
  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        className="video-group-category"
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {category || '카테고리 없음'}
        </Typography>
        {
          open 
          ? <KeyboardArrowUpIcon /> 
          : <KeyboardArrowDownIcon />
        }
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <VideoList videoList={videoList} />
      </Collapse>
    </Box>
  )
}

export default VideoGroup