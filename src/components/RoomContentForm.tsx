import RoomHeader from './RoomHeader'
import { Controller, useForm } from 'react-hook-form'
import { Box, TextField, Tooltip } from '@mui/material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import { useParams } from 'react-router-dom'
import { useDeleteVideo, useEditVideo } from '../core/query'
import { useRecoilState } from 'recoil'
import { VideoDataAtom, videoUpdateAtom, roomHeaderConsumerAtom } from '../core/Atom'
import VideoForm from './VideoForm'
import { useDeepCompareEffect } from 'use-deep-compare'

interface PropsForm {
  openForm: boolean,
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
}

interface ContentForm {
  orderNumer: number
  title: string
  category: string
  memo: string
  youtube: string
}

const RoomContentForm = ({openForm, setOpenForm}: PropsForm) => {

  //// 수정 ////
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
  const[videoUpdate, setVideoUpdate] = useRecoilState(videoUpdateAtom)
  /////////////

  const videoForm = useForm<Video>({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  useDeepCompareEffect(() => {
    if(!videoUpdate) return
    videoForm.reset({
      orderNumer: videoData.orderNumber !== 0 ? videoData.orderNumber :0,
      title: videoData.title !== '' ? videoData.title :'',
      category: videoData.category !== '' ? videoData.category : '',
      memo: videoData.memo !== '' ? videoData.memo : '',
      youtube: videoData.youtube !== '' ? videoData.youtube : '',
    })
  },[videoData])
  
  const { handleSubmit, watch } = videoForm
  const { youtube } = watch()

  const { id: roomId = '' } = useParams()

  let videoUpateId
  if(videoData.id !== '') {
    videoUpateId = videoData.id
  }
  else if(videoData.id === '') {
    videoUpateId = undefined
  }

  const {
    editVideo,
    isLoading: isSaving,
  }= useEditVideo(roomId,videoUpateId) // 추가 및 수정

  const[roomHeaderConsumer, setRoomHeaderConsumer] = useRecoilState(roomHeaderConsumerAtom)

  const onSave = handleSubmit(form => {
    if(isSaving) return
    const {
      orderNumer, title, category,
      memo, youtube,
      ...restForm
    } = form

    const nextVideoForm = {
      orderNumer: Number.parseInt(String(orderNumer), 10),
      title: title.trim(),
      category: category.trim(),
      memo: memo.trim(),
      youtube: youtube.trim(),
      ...restForm,
    }

    editVideo(nextVideoForm)
    setRoomHeaderConsumer('')
  })


  return (
    <div className="room-content-form-layout">
      <RoomHeader 
        consumer="addCard"
        toggle={openForm} 
        setToggle={setOpenForm}
        onSave={onSave}
      />
      <VideoForm 
        videoForm={videoForm}
        youtube={youtube}
      />
    </div>
  )
}

export default RoomContentForm