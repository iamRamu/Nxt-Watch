import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import './index.css'
import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import { formatDistanceToNow } from 'date-fns'
import { Dot, ThumbsUp, ThumbsDown, ListPlus } from 'lucide-react'
import { store } from '../Home'


const BrowseVideoDetails = () => {
    const {savedVideosIds, setSavedVideosIds,  videoLiked, setVideoLiked, videoDisliked, setVideoDisliked} = useContext(store)
    //console.log("savedVideosIds", savedVideosIds)
    const [isLikeActive, setIsLikeActive] = useState(false)
    const [isDisLikeActive, setIsDisLikeActive] = useState(false)
    const [isSaveActive, setIsSaveActive] = useState(false)

    const isDarkMode = useOutletContext()
    const darkModeColor = isDarkMode ? "white" : "black"
    const {id} = useParams()
    const location = useLocation()
    const {pathname} = location
    //console.log("BrowseDetails Path", pathname)
    const isSaved = savedVideosIds.includes(id)
    const saveButtonColor = isSaved && "#036ffc" 
    const isLike = videoLiked.includes(id)
    const likeButtonColor = isLike && !isDisLikeActive ? "#036ffc" : darkModeColor 
    const isDisLike = videoDisliked.includes(id)
    const disLikeButtonColor = isDisLike && !isLikeActive ? "#036ffc" : darkModeColor

    const navigate = useNavigate()
    const [specificVideo, setSpecificVideo] = useState(null)
    const apiUrl = `https://apis.ccbp.in${pathname}`
    //console.log("BrowseDetailsApiUrl", apiUrl)
    const token = Cookies.get("jwt_token")
    const options = {
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    useEffect(()=>{
        if(token === undefined){
            navigate("/login")
        }else{
            const getSpecificVideoData = async() =>{
                try {
                    const response = await fetch(apiUrl, options)
                    const data = await response.json()
                    setSpecificVideo(data.video_details)
                    
                    setIsLikeActive(videoLiked.includes(id));
                    setIsDisLikeActive(videoDisliked.includes(id));
                    setIsSaveActive(savedVideosIds.includes(id));
                } catch (error) {
                    console.log("Errors", error)
                }
                
            }
            getSpecificVideoData()
        } 
    },[videoLiked, videoDisliked, savedVideosIds, id])

    const toggleLikeButton = () => {
        setIsLikeActive(prev => !prev)
        setIsDisLikeActive(false)
        if(!isLikeActive){
            if(!videoLiked.includes(id)){
                setVideoLiked(prev => [...prev, id])
                setVideoDisliked(prevDisliked => prevDisliked.filter(eachId => eachId !== id));
            }
        }else{
            const filteredLikedVideos = videoLiked.filter(eachId => eachId !== id)
             setVideoLiked(filteredLikedVideos)
        }
    }

    const toggleDisLikeButton = () => {
        setIsDisLikeActive(prev => !prev)
        setIsLikeActive(false)
        if(!isDisLikeActive){
            if(!videoDisliked.includes(id)){
                setVideoDisliked(prev => [...prev, id])
                setVideoLiked(prevLiked => prevLiked.filter(eachId => eachId !== id));
            }
        }else{
            const filteredDisLikedVideos = videoDisliked.filter(eachId => eachId !== id)
             setVideoDisliked(filteredDisLikedVideos)
        }
    }

    const toggleSaveButton = () => {
        setIsSaveActive(prev => !prev)
        if(!isSaveActive){
            if(!savedVideosIds.includes(id)){
                setSavedVideosIds(prev => [...prev, id])
            }
        }else{
            const filteredSavedVideos = savedVideosIds.filter(eachId => eachId !== id)
             setSavedVideosIds(filteredSavedVideos)
        }
    }

    return (
        <div className='browse-video-details-bg-container'>
            {specificVideo &&
                <div className='video-player-container'>
                    <ReactPlayer url={specificVideo.video_url} controls className="video-player react-player" width='98%'
                    height='50vh'/>
                    <h2 style={{color : darkModeColor}}>{specificVideo.title}</h2>
                    <div style={{color : darkModeColor}} className='browse-details-views-likes-container'>
                        <div className='views-published-time-container'>
                            <p>{specificVideo.view_count} views</p>
                            <p className='browse-details-distance'><Dot className='dot'/> {formatDistanceToNow(specificVideo.published_at)}</p>
                        </div>
                        <div className='browser-like-dislike-save-container'>
                            <div className='browser-details-like-container' style={{color : likeButtonColor}}>
                                <ThumbsUp className='browse-details-like-logo' id='like-icon' onClick={toggleLikeButton}/>
                                <label htmlFor='like-icon' onClick={toggleLikeButton}>Like</label>
                            </div>
                            <div className='browser-details-like-container' style={{color : disLikeButtonColor}}>
                                <ThumbsDown className='browse-details-like-logo' id='dislike-icon' onClick={toggleDisLikeButton}/>
                                <label htmlFor='dislike-icon' onClick={toggleDisLikeButton}>Dislike</label>
                            </div>
                            <div className='browser-details-like-container' style={{color : saveButtonColor}}>
                                <ListPlus className='browse-details-like-logo' id='save-icon' onClick={toggleSaveButton}/>
                                <label htmlFor='save-icon' onClick={toggleSaveButton}>Save</label>
                            </div>
                        </div>
                    </div>
                    <hr className='hr-line'/>
                    <div style={{color : darkModeColor, display:"flex", alignItems:"flex-start"}} >
                        <img src={specificVideo.channel.profile_image_url} className='browse-video-channel-logo'/>
                        <div style={{color : darkModeColor}} className='browse-details-channel-container'>
                            <h4 className='browse-video-channel-name'>{specificVideo.channel.name}</h4>
                            <p className='browse-video-channel-subscribers'>{specificVideo.channel.subscriber_count} Subscribers</p>
                            <p className='browse-video-channel-description'>{specificVideo.description}</p>
                        </div>
                    </div>

                </div>
            }
            
        </div>
    )
}
export default BrowseVideoDetails


