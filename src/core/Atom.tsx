import { atom } from 'recoil'

export const openFormAtom = atom({
  key: 'openForm',
  default: false
})

export const videoPlayOpenAtom = atom({
  key: 'videoOpen',
  default: false
})

export const VideoDataAtom = atom({
  key: 'videoData',
  default: {
    id:'',
    orderNumber:0,
    title: '',
    category:'',
    memo:'',
    youtube:''
  }
})