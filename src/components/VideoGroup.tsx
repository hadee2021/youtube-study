
interface PropsVideoGroup {
  category: string
  videoList: Video[]
}

const VideoGroup = ({category, videoList}:PropsVideoGroup) => {
  console.log('category', category)
  console.log('videoList', videoList)
  return (
    <div>VideoGroup</div>
  )
}

export default VideoGroup