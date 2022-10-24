import { Box, Collapse, Typography, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from "react"
import VideoCard from './VideoCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useRecoilState } from 'recoil'
import { openFormAtom, VideoDataAtom, roomHeaderConsumerAtom, videoUpdateAtom } from '../core/Atom'
import styled from 'styled-components'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1201 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1200, min: 761 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1
  }
}

interface VideoListProps {
  videoList: Video[]
}

function VideoList({ videoList }: VideoListProps) {
  return (
    <Box>
      <Carousel responsive={responsive} className="carousel">
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

  // 빠른추가
  const[openForm, setOpenForm] = useRecoilState(openFormAtom)
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
  const[roomHeaderConsumer, setRoomHeaderConsumer] = useRecoilState(roomHeaderConsumerAtom)
  const[videoUpdate, setVideoUpdate] = useRecoilState(videoUpdateAtom)

  let newOrderNumber = videoList[videoList.length-1].orderNumer + 1

  const openAddCard = (category: string) => {
    setOpenForm(true)
    setVideoData({
      ...videoData,
      id:'',
      orderNumber: newOrderNumber,
      title: '',
      category: category,
      memo:'',
      youtube:''
    })
    setVideoUpdate(true) // 변경점의 로직 사용
    setRoomHeaderConsumer('addCard')
  }

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        className="video-group-category"
      >
        <CategoryBtn>
          <Typography variant="subtitle1" fontWeight="bold" className="category-name">
            {category || '카테고리 없음'}
          </Typography>
          <Button 
            
            size="small"
            onClick={() => openAddCard(category)}
          >
            + 빠른 추가
          </Button>
        </CategoryBtn>
        
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

const CategoryBtn = styled.div`
  display: flex;
  gap: 15px;
  .category-name {
    line-height: 2;
  }
`