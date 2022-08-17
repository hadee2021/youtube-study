import { Control, Controller, UseFormRegister} from 'react-hook-form'
import { Box, TextField, Tooltip } from '@mui/material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'

interface Props {
  control: Control<Video, any>
  register: UseFormRegister<Video>
  youtube: string 
}


const VideoForm = ({control, register, youtube}: Props) => {
  
  return (
    <div className="room-content-form">
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
      </div>
  )
}

export default VideoForm