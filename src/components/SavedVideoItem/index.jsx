import {Dot} from 'lucide-react'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const SavedVideoItem = props => {
    const {savedVideoDetails} = props
    const {channel, description, published_at, thumbnail_url, title, view_count, video_url} = savedVideoDetails
    const {name, profile_image_url, subscriber_count} = channel
    const distance = formatDistanceToNow(published_at)
    return(
        <div className='saved-video-item-bg-container'>
            <div className='saved-video-item-thumbnail-container'>
                <img src={thumbnail_url} className='saved-video-item-thumbnail'/>
            </div>
            <div className='saved-video-item-channel-details-container'>
                <h2 className='saved-video-title'>{title}</h2>
                <h3 className='saved-video-name'>{name}</h3>
                <div className='saved-video-views-distance-container'>
                    <p className='saved-video-viewscount'>{view_count} views</p>
                    <p className='saved-video-distance'><Dot /> {distance}</p>
                </div>
            </div>
        </div>
    )
}
export default SavedVideoItem