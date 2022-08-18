import { fireStore, getDefaultConverter } from '../core/firestore'
import { nanoid } from 'nanoid'
import { 
  collection,
  where,
  query,
  doc,
  QueryConstraint,
  orderBy
} from 'firebase/firestore'
import { 
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentDeletion
} from "@react-query-firebase/firestore"
import { hash } from './util'
import { useMemo } from 'react'
import { groupBy } from 'lodash'

/* 기본 세팅 */

const ROOT = 'yotubes'
const VIDEO_LIST = 'Video'
const roomConverter = getDefaultConverter<Room>()
const videoConverter = getDefaultConverter<Video>()
const EMPTY_ROOM_ID = 'EMPTY_ROOM_ID'
const EMPTY_VIDEO_ID = 'EMPTY_VIDEO_ID'

const getRoomCollectionRef = () => (
  collection(fireStore, ROOT).withConverter(roomConverter)
)

const getRoomDocRef = (roomId: string) => (
  doc(fireStore, ROOT, roomId || EMPTY_ROOM_ID).withConverter(roomConverter)
)

const getVideoCollectionRef = (roomId: string) => (
  collection(fireStore, ROOT, roomId || EMPTY_ROOM_ID, VIDEO_LIST).withConverter(videoConverter)
)
const getVideoDocRef = (roomId: string, videoId: string) => (
  doc(fireStore, ROOT, roomId || EMPTY_ROOM_ID, VIDEO_LIST, videoId || EMPTY_VIDEO_ID)
    .withConverter(videoConverter)
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

/* Video 가져오기 */
export const useVideoList = (roomId: string) => {
  const videoCollectionRef = getVideoCollectionRef(roomId)

  let groupField = 'category'

  const constraints: QueryConstraint[] = []
  constraints.push(orderBy('orderNumer', 'asc'))
  const queryConstraints = constraints

  const ref = query(
    videoCollectionRef,
    ...queryConstraints,
  )

  const {
    data: videoList = [],
    dataUpdatedAt,
    ...result
  } = useFirestoreQueryData(
    [ROOT, roomId, VIDEO_LIST],
    ref,
    { subscribe: true },
    { enabled: Boolean(roomId) },
  )

  return useMemo(() => {

    return {
      videoList,
      groupByWithFilter () {
        return groupBy(videoList, groupField)
      },
      dataUpdatedAt,
      ...result,
    }
  },[dataUpdatedAt])

}



/* Video 신규등록 및 수정 */
export const useEditVideo = (roomId: string, videoId?: string) => {
  const videoDocId = videoId ?? nanoid(5)
  const videoDocRef = getVideoDocRef(roomId, videoDocId)

  const { mutate, ...result } = useFirestoreDocumentMutation(videoDocRef, { merge: true })

  return {
    ...result,
    videoDocId,
    editVideo (videoForm: Video, options?: Parameters<typeof mutate>[1]) {
      mutate({ ...videoForm, id: videoDocId }, options)
    },
  }
}

/* Video 삭제 */
export const useDeleteVideo = (roomId: string, videoId = EMPTY_VIDEO_ID) => {
  const videoDocRef = getVideoDocRef(roomId, videoId)
  const {
    refetch: refetchVideoList,
  } = useVideoList(roomId)
  const { mutate, ...result } = useFirestoreDocumentDeletion(videoDocRef, {
    onSuccess() {
      refetchVideoList()
    }
  })

  return {
    ...result,
    deleteVideo (options?: Parameters<typeof mutate>[1]) {
      if (!videoId || videoId === EMPTY_VIDEO_ID) return
      mutate(undefined, options)
    },
  }

}
