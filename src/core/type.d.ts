declare module 'react-query'
declare module 'sha1'
declare module 'lodash'

declare interface Room {
  id: string
  name: string
  pwd: string
}

declare interface Video {
  id?: string
  orderNumer: number
  title: string
  category: string
  memo: string
  youtube: string
}