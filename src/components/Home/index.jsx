import Header from '../Header'
import Cookies from 'js-cookie'
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import SlideBar from '../SlideBar'
//import AllVideos from '../AllVideos'
export const store = createContext([])
const Home = () => {
    const [isDarkModeActive, setIsDarkModeActive] = useState(false)
    const [savedVideosIds, setSavedVideosIds] = useState([])
    const [videoLiked, setVideoLiked] = useState([])
    const [videoDisliked, setVideoDisliked] = useState([])
    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    //console.log("token", token)
    useEffect(()=>{
        if(token === undefined){
            navigate("/login")
        }
    },[])

    const homeBgColor = isDarkModeActive ? "black" : "white"

    const toggleLightDarkMode = () => {
        setIsDarkModeActive(prev => !prev)
    }
    
    return(
        <store.Provider value={{savedVideosIds, setSavedVideosIds, videoLiked, setVideoLiked, videoDisliked, setVideoDisliked}}>
            <div className='home-bg-container' style={{backgroundColor : homeBgColor}}>
                <Header isDarkMode={isDarkModeActive} toggleLightDarkMode={toggleLightDarkMode}/>
                <div className='home-bottom-container'>
                    <div className='home-slide-bar-container'>
                        <SlideBar isDarkMode={isDarkModeActive}/>
                    </div>
                    <div className='home-main-container'>
                        {/* <AllVideos isDarkMode={isDarkModeActive}/> */}
                        <Outlet context={isDarkModeActive}/>
                    </div>
                </div>
            </div>
        </store.Provider>
    )
}
export default Home