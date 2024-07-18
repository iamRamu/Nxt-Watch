import Cookies from 'js-cookie'
import "./index.css"
import { useContext, useEffect, useState} from "react"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { FaFire } from 'react-icons/fa6'
import { store } from '../Home'
import SavedVideoItem from '../SavedVideoItem'


const LikedVideos = () => {
    const {savedVideosIds} = useContext(store)
    const [finalSavedVideos, setFinalSavedVideos] = useState([])
    const isDark = useOutletContext()
    // console.log("isDark", isDark)
    // console.log("finalSavedVideos", finalSavedVideos)
    // console.log("setSavedVideo", savedVideosIds)
    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    const options = {
        method : "GET", 
        headers : {
            Authorization : `Bearer ${token}`
        }
    } 

    useEffect(()=> {
        if(token === undefined){
            navigate("/login")
        }else {
            const fetchedVideoIds = new Set()
            const getSavedVideos = async () => {
                for (const eachId of savedVideosIds) {
                    if (!fetchedVideoIds.has(eachId)) {
                        const response = await fetch(`https://apis.ccbp.in/videos/${eachId}`, options)
                        const data = await response.json()
                        setFinalSavedVideos(prev => {
                            if (!prev.some(video => video.id === data.video_details.id)) {
                                return [...prev, data.video_details]
                            }
                            return prev
                        })
                        fetchedVideoIds.add(eachId)
                    }
                }
            }
            getSavedVideos()
        }
    },[finalSavedVideos, savedVideosIds])

    const darkModeColor = isDark ? "white" : "black"

    return(
        <div className="trending-bg-container">
            <div className="trending-header-container">
                <FaFire className="trending-fire-icon"/>
                <h2>Saved Videos</h2>
            </div>
            <div className='savedVideos-main-container' style={{color : darkModeColor}}>
                {finalSavedVideos && finalSavedVideos.length > 0 ? 
                    finalSavedVideos.map(eachSavedVideo => <SavedVideoItem  savedVideoDetails={eachSavedVideo} key={eachSavedVideo.id}/>)
                    :
                    <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png ' className='no-saved-videos-img'/>
                }
            </div>
        </div>
    )
}
export default LikedVideos