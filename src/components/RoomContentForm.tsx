import RoomHeader from './RoomHeader'
import { Controller, useForm } from 'react-hook-form'
import { Box, TextField, Tooltip } from '@mui/material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import { useParams } from 'react-router-dom'
import { useEditVideo } from '../core/query'
import { useRecoilState } from 'recoil'
import { VideoDataAtom, videoUpdateAtom } from '../core/Atom'
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
  console.log('videoData', videoData)
  const[videoUpdate, setVideoUpdate] = useRecoilState(videoUpdateAtom)
  ////////////////////////

  /** 시작*/
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
  /**끝 */


  // const {
  //   control,
  //   watch,
  //   formState,
  //   register,
  //   handleSubmit,
  //   setValue,
  // } = useForm<ContentForm>({
  //   mode: 'all',
  //   defaultValues: {
  //     orderNumer: 0,
  //     title: '',
  //     category: '',
  //     memo: '',
  //     youtube: ''
  //   },
  // })
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
    videoDocId
  }= useEditVideo(roomId,videoUpateId) // 추가

  const isLoading = isSaving

  const onSave = handleSubmit(form => {
    if(isLoading) return
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
      
      {/* <div className="room-content-form">
        <Box>
          <Controller 
            name="orderNumer"
            control={control}
            rules={{
              required: "번호는 필수 입니다"
            }}
            render={({ fieldState }) => (
              <Tooltip title="하나의 커리큘럼안의 영상순서(소수점 가능)" placement="bottom">
                <TextField 
                  type="number"
                  error={Boolean(fieldState.error)}
                  required
                  label="영상 번호 (순서결정, 변경가능)"
                  variant="standard"
                  {...register('orderNumer')}
                  helperText={(
                    <Box
                      component="span"
                      visibility={fieldState.error ? "visible" : "hidden"}
                    >
                      <span>
                        {fieldState.error?.message}
                      </span>
                    </Box>
                  )}
                />
              </Tooltip>
            )}
          />
        </Box>
        <Box>
          <Controller 
            name="title"
            control={control}
            rules={{
              required: "제목은 필수 입니다"
            }}
            render={({ fieldState }) => (
              <TextField 
                error={Boolean(fieldState.error)}
                required
                label="제목"
                variant="standard"
                {...register('title')}
                fullWidth
                helperText={(
                  <Box
                    component="span"
                    visibility={fieldState.error ? "visible" : "hidden"}
                  >
                    <span>
                      {fieldState.error?.message}
                    </span>
                  </Box>
                )}
              />
            )}
          />
        </Box>
        <Box>
          <Controller 
            name="category"
            control={control}
            rules={{
              required: "카테고리는 필수 입니다"
            }}
            render={({ fieldState }) => (
              <Tooltip title="커리큘럼 분류에 사용 됩니다" placement="bottom">
                <TextField 
                  error={Boolean(fieldState.error)}
                  required
                  label="카테고리( 커리큘럼 제목 입니다. )"
                  variant="standard"
                  {...register('category')}
                  fullWidth
                  helperText={(
                    <Box
                      component="span"
                      visibility={fieldState.error ? "visible" : "hidden"}
                    >
                      <span>
                        {fieldState.error?.message}
                      </span>
                    </Box>
                  )}
                />
              </Tooltip>
            )}
          />
        </Box>
        <Box sx={{marginTop: 5}}>
          <TextField
            label="메모"
            variant="outlined" fullWidth
            multiline rows={7}
            InputProps={{
              inputProps: { maxLength: 10240 },
            }}
            {...register('memo')}
          />
        </Box>
        <Box sx={{ mt: 5}}>
          <Controller
            name="youtube"
            control={control}
            render={({ fieldState }) => (
              <Tooltip title="유튜브 링크 입력" placement="bottom">
                <TextField
                  error={Boolean(fieldState.error)}
                  placeholder="e.g) https://www.youtube.com/watch?v=..."
                  variant="standard" 
                  fullWidth
                  {...register('youtube', {
                    validate (link) {
                      const trimmed = link.trim()
                      if (!trimmed) return undefined
                      const { id, service } = getVideoId(trimmed)
                      if (!id || service !== 'youtube') {
                        return '정상적인 YouTube 동영상 주소를 입력해주세요.'
                      }
                      return undefined
                    }
                  })}
                />
              </Tooltip>
            )}
          />
        </Box>
        <Box sx={{ mt: 5}}>
          {
            youtube 
            ? 
              <YouTube
                title="유튜브"
                videoId={getVideoId(youtube).id ?? ''}
                opts={{
                  width: '100%',
                  height: '300px',
                }}
              />
            :
            <div>미리보기 준비중....</div>
          }
        </Box>
      </div> */}
    </div>
  )
}

export default RoomContentForm