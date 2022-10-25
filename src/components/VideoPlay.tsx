import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'
import { Close } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { videoPlayOpenAtom, VideoDataAtom } from '../core/Atom'


const VideoPlay = () => {
  const[openVideoPlay, setOpenVideoPlay] = useRecoilState(videoPlayOpenAtom)
  const[videoData, setVideoData] = useRecoilState(VideoDataAtom)
  return (
    <div className="play-modal-body">
      <div>
        <Close onClick={() => setOpenVideoPlay(false)} />
      </div>
      <YouTube
        title={videoData.title}
        videoId={getVideoId(videoData.youtube).id ?? ''}
        opts={{
          width: '100%',
          height: '400px',
        }}
      />
    </div>
  )
}

export default VideoPlay