import {formatDistanceToNow} from 'date-fns'
import './index.css'
import { Dot } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const VideoItem = props => {
    const {videoDetails, isDarkModeActive} = props
    const {id, title, thumbnail_url, channel, view_count, published_at} = videoDetails
    const {name, profile_image_url} = channel
    const distance = formatDistanceToNow(published_at)
    const darkModeTextColor = isDarkModeActive && "white"
    // const location = useLocation()
    // const {pathname} = location
    // console.log("HomeVideos location", location)
    //console.log("isDarkMode", isDarkModeActive)
    return(
        <Link to={`/videos/${id}`} className='video-item-bg-container'>
            <img src={thumbnail_url} alt={title}/>
            <div className='video-item-video-details-container'>
                <img src={profile_image_url} className='video-item-channel-profile-logo'/>
                <div className='video-item-channel-details-container'>
                    <h6 className='video-item-video-title' style={{color: darkModeTextColor}}>{title}</h6>
                    <h5 className='video-item-channel-name' style={{color: darkModeTextColor}}>{name}</h5>
                    <div className='video-item-views-time-container' style={{color: darkModeTextColor}}>
                        <p className='video-item-video-views-count' style={{color: darkModeTextColor}}>{view_count} views</p>
                        <p className='video-item-distance' style={{color: darkModeTextColor}}><Dot className='dot'/>{distance}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default VideoItem