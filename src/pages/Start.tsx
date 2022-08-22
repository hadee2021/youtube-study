import { Controller, useForm } from 'react-hook-form'
import { useFindRoom, useCreateRoom } from '../core/query'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import { Lock, LockOpen } from '@mui/icons-material'
import { useState } from 'react'

interface RoomForm {
  roomName: string
  roomPwd: string
}

const Start = () => {
  const[showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    control,
    watch,
    formState,
    register,
    handleSubmit,
  } = useForm<RoomForm>({
    mode: 'all',
    defaultValues: {
      roomName: '',
      roomPwd: '',
    },
  })
  const { roomName, roomPwd } = watch()
  const { errors } = formState

  /* 방으로 이동 */
  const navigate = useNavigate()
  const { room, isSuccess } = useFindRoom(roomName.trim(), roomPwd)
  const {
    createRoom,
    roomId: newRoomId
  } = useCreateRoom()

  const goToRoom = handleSubmit(() => {
    console.log('room:', room)
    // 방이 없으면 새로 만든다
    if(!room) {
      createRoom(roomName.trim(), roomPwd)
      navigate(`/room/${newRoomId}`, { replace: true })
      return
    }
    // 방이 있으면 방으로 이동
    navigate(`/room/${room.id}`, { replace: true })
  })

  return (
    <div className="start-align">
      <Box sx={{width: 350}}>
        <Box>
          <Typography fontSize="2.8rem" lineHeight={1.5}>
            YouTube
          </Typography>
          <Typography fontSize="2.8rem" lineHeight={1.5}>
            Study Room
          </Typography>
        </Box>
        <Box>
          <Controller 
            name="roomName"
            control={control}
            rules={{
              required: "방이름은 필수 입니다",
              minLength: {
                value: 2,
                message: "2글자 이상 입력 하세요",
              },
            }}
            render={({ fieldState }) => (
              <TextField 
                error={Boolean(fieldState.error)}
                required
                label="Room Name (필수)"
                variant="standard"
                {...register('roomName')}
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
          <Box>
            <TextField 
              error={Boolean(errors.roomPwd)}
              label="비밀번호 (선택)"
              variant="standard"
              {...register('roomPwd')}
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <LockOpen /> : <Lock />}
                  </IconButton>
                )
              }}
            />
          </Box>
          <Button 
            variant="contained"
            size="large"
            sx={{mt: 2}}
            fullWidth
            onClick={() => {
              if(isSuccess) goToRoom()
            }}
          >
            방 입장
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Start