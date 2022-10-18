import { Controller, useForm } from 'react-hook-form'
import { useFindRoom, useCreateRoom } from '../core/query'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import { Lock, LockOpen } from '@mui/icons-material'
import { useState } from 'react'
import styled from 'styled-components'

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

  const goDemoRoom = () => {
    navigate(`/room/oVkuv`, { replace: true })
  }

  const [tab, setTab] = useState('demo')

  return (
    <div className="start-align">
      <Box 
        sx={{ 
          width: 350,
          height: 380
        }}
      >
        <TabMenu>
          <div 
            onClick={() => setTab('demo')}
            className={ tab === 'demo' ? `tab-highlight` : ``}
          >
            Demo
          </div>
          <div 
            onClick={() => setTab('login')}
            className={ tab === 'login' ? `tab-highlight` : ``}
          >
            Login
          </div>
        </TabMenu>

        <Box sx={{mb: 3}} >
          <Typography fontSize="2.8rem" lineHeight={1.5}>
            YouTube
          </Typography>
          <Typography fontSize="2.8rem" lineHeight={1.5}>
            Study Room
          </Typography>
        </Box>
        
        { tab === 'login' &&
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
            sx={{mt: 5}}
            fullWidth
            onClick={() => {
              if(isSuccess) goToRoom()
            }}
          >
            방 입장
          </Button>
        </Box>
        }
        { tab === 'demo' &&
        <Box>
          <DemoDescript>
            <div>
              <p>YouTube로 공부 중 이신가요 ??!</p>
              <p>자신만의 커리큘럼을 구성할 수 있습니다.</p>
              <p>Deomo 버전으로 체험해보세요!</p>
            </div>
          </DemoDescript>
          <Button 
            variant="contained"
            size="large"
            sx={{mt: 5}}
            fullWidth
            onClick={() => goDemoRoom()}
          >
            Demo 입장
          </Button>
        </Box>
        }
      </Box>
    </div>
  )
}

export default Start

const TabMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: larger;
  font-weight: 600;
  margin-bottom: 25px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 15px;

  > div {
    cursor: pointer;
  }

  .tab-highlight {
    color: #1976D2;
  }

`

const DemoDescript = styled.div`
  height: 107px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background: #eee;
    border-radius: 8px;
    padding: 0 15px;
  }

`