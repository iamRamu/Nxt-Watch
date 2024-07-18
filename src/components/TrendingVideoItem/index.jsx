import {formatDistanceToNow} from "date-fns"
import './index.css'
import { Dot } from "lucide-react"
import { Link, useOutletContext } from "react-router-dom"

const TrendingVideoItem = props => {
    const isDarkMode = useOutletContext()
    const darkModeColor = isDarkMode ? "white" : "black"
    const {trendingVideoDetails} = props
    const {id,title, thumbnail_url, channel, view_count, published_at} = trendingVideoDetails
    const {name, profile_image_url} = channel
    const distance = formatDistanceToNow(published_at)
    return(
        <Link to={`/videos/${id}`} className='trending-video-item-bg-container'>
            <img src={thumbnail_url} className='trendig-video-item-thumnail-logo'/>
            <div className='trending-video-item-video-details-container'>
                <h3 className="trending-video-item-title" style={{color : darkModeColor}}>{title}</h3>
                <h4 className="trending-video-item-channel-name" style={{color : darkModeColor}}>{name}</h4>
                <div className='trending-video-item-views-container' style={{color : darkModeColor}}>
                    <p className="trending-video-item-views">{view_count} views</p>
                    <p className="trending-video-item-distance"><Dot className="dot"/> {distance}</p>
                </div>
            </div>
        </Link>
    )
}
export default TrendingVideoItem