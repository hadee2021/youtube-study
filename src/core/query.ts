import { fireStore, getDefaultConverter } from '../core/firestore'
import { nanoid } from 'nanoid'
import { 
  collection,
  where,
  query,
  doc
} from 'firebase/firestore'
import { 
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentData
} from "@react-query-firebase/firestore"
import { hash } from './util'

/* 기본 세팅 */

const ROOT = 'yotubes'
const roomConverter = getDefaultConverter<Room>()
const EMPTY_ROOM_ID = 'EMPTY_ROOM_ID'

const getRoomCollectionRef = () => (
  collection(fireStore, ROOT).withConverter(roomConverter)
)

const getRoomDocRef = (roomId: string) => (
  doc(fireStore, ROOT, roomId || EMPTY_ROOM_ID).withConverter(roomConverter)
)

// Start에서 사용

/* Room 확인 */
export const useFindRoom = (roomName = '', roomPwd = '') => {
  const roomCollectionRef = getRoomCollectionRef()
  const roomCollectionQuery = query(
    roomCollectionRef,
    where('name', '==', roomName),
    where('pwd', '==', hash(roomPwd)),
  )
  const {
    data: roomList = [],
    ...result
  } = useFirestoreQueryData([ROOT, roomName, roomPwd], roomCollectionQuery)

  return {
    room: roomList[0],
    ...result,
  }
}

/* Room 생성 */
export const useCreateRoom = () => {
  const roomId = nanoid(5)
  const roomDocRef = getRoomDocRef(roomId)
  const { mutate, ...result } = useFirestoreDocumentMutation(roomDocRef)

  return {
    ...result,
    roomId,
    createRoom (roomName: string, roomPwd: string) {
      mutate({
        id: roomId,
        name: roomName,
        pwd: hash(roomPwd),
      })
    },
  }
}

// Room 에서 사용

/* Room 상세 정보 */
export const useRoom = (roomId: string) => {
  const roomDocRef = getRoomDocRef(roomId)
  const {
    data: room,
    ...result
  } = useFirestoreDocumentData([ROOT, roomId], roomDocRef)
  return { room, ...result }
}

