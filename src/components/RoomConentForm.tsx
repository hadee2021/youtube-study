import React from 'react'
import RoomHeader from './RoomHeader'

interface PropsForm {
  openAdd: boolean,
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const RoomConentForm = ({openAdd, setOpenAdd}: PropsForm) => {
  return (
    <>
      <RoomHeader 
        consumer="addCard"
        toggle={openAdd} 
        setToggle={setOpenAdd}
      />
      <div className="room-content">
        양식
      </div>
    </>
  )
}

export default RoomConentForm