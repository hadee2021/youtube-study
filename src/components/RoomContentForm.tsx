import React from 'react'
import RoomHeader from './RoomHeader'
import { Controller, useForm } from 'react-hook-form'
import { Box, TextField, Tooltip } from '@mui/material'

interface PropsForm {
  openAdd: boolean,
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}

interface ContentForm {
  orderNumer: number
  title: string
  category: string
  memo: string
  youtube: string
}

const RoomContentForm = ({openAdd, setOpenAdd}: PropsForm) => {

  const {
    control,
    watch,
    formState,
    register,
    handleSubmit,
  } = useForm<ContentForm>({
    mode: 'all',
    defaultValues: {
      orderNumer: 0,
      title: '',
      category: '',
      memo: '',
      youtube: ''
    },
  })

  const onSave = handleSubmit(() => {})

  return (
    <div className="room-content-form-layout">
      <RoomHeader 
        consumer="addCard"
        toggle={openAdd} 
        setToggle={setOpenAdd}
        onSave={onSave}
      />
      <div className="room-content-form">
        <Box>
          <Controller 
            name="orderNumer"
            control={control}
            rules={{
              required: "번호는 필수 입니다"
            }}
            render={({ fieldState }) => (
              <Tooltip title="하나의 커리큘럼안의 영상순서" placement="bottom">
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
      </div>
    </div>
  )
}

export default RoomContentForm