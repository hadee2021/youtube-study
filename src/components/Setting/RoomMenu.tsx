import DeleteRoomButton from "./DeleteRoomButton"
import ExitRoomButton from "./ExitRoomButton"

const RoomMenu = () => {
  return (
    <div className="room-menu">
      <ExitRoomButton />
      <DeleteRoomButton />
    </div>
  )
}

export default RoomMenu