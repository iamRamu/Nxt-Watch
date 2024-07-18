import { Link, useOutletContext } from 'react-router-dom'
import './index.css'

const GamingVideoItem = props => {
    const isDarkMode = useOutletContext()
    const darkModeColor = isDarkMode ? "white" : "black"
    const {gamingVideoDetails} = props
    const {id, title, thumbnail_url, view_count} = gamingVideoDetails
    return(
        <Link to={`/videos/${id}`} className='gaming-video-item-bg-container'>
            <img src={thumbnail_url} className='gaming-video-item-img'/>
            <h4 className='gaming-video-item-title' style={{color : darkModeColor}}>{title}</h4>
            <p className='gaming-video-item-views' style={{color : darkModeColor}}>{view_count} Watching Worldwide</p>
        </Link>
    )
}
export default GamingVideoItem