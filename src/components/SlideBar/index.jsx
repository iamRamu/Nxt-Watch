import { MdHome } from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import './index.css'
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const constants = {
    home : "",
    trending : "",
    gaming : "",
    likedvideos : ""
}
const SlideBar = props => {
    const location = useLocation()
    const {pathname} = location
    // console.log("location", location)
    // console.log("pathname", pathname)
    if(pathname === "/"){
        constants.home = "gray"
        constants.trending = ""
        constants.gaming = ""
        constants.likedvideos = ""
    }
    else if(pathname === "/trending"){
        constants.home = ""
        constants.trending = "gray"
        constants.gaming = ""
        constants.likedvideos = ""
    }
    else if (pathname === "/gaming"){
        constants.home = ""
        constants.trending = ""
        constants.gaming = "gray"
        constants.likedvideos = ""
    }
    else if(pathname === "/liked-videos"){
        constants.home = ""
        constants.trending = ""
        constants.gaming = ""
        constants.likedvideos = "gray"
    }
    const [homeBgColor, setHomeBgColor] = useState(constants.home)
    const [trendingBgColor, setTrendingBgColor] = useState(constants.trending)
    const [gamingBgColor, setGamingBgColor] = useState(constants.gaming)
    const [likdedVideoBgColor, setLikedVideoBgColor] = useState(constants.likedvideos) 
    const {isDarkMode} = props
    const darkModeTextColor = isDarkMode ? "white" : "black"

    const handleHomeBgColor = () => {
        setHomeBgColor("gray")
        setTrendingBgColor("")
        setGamingBgColor("")
        setLikedVideoBgColor("")
    }
    const handleTrendingBgColor = () => {
        setHomeBgColor("")
        setTrendingBgColor("gray")
        setGamingBgColor("")
        setLikedVideoBgColor("")
    }
    const handleGamingBgColor = () => {
        setHomeBgColor("")
        setTrendingBgColor("")
        setGamingBgColor("gray")
        setLikedVideoBgColor("")
    }
    const handleLikedVideoBgColor = () => {
        setHomeBgColor("")
        setTrendingBgColor("")
        setGamingBgColor("")
        setLikedVideoBgColor("gray")
    }
    //console.log("homebgColor", homeBgColor)
    const homeLogoColor = homeBgColor && "rgba(254, 10, 10, 0.733)"
    const trendingLogoColor = trendingBgColor && "rgba(254, 10, 10, 0.733)"
    const gamingLogoColor = gamingBgColor && "rgba(254, 10, 10, 0.733)"
    const likedVideosLogoColor = likdedVideoBgColor && "rgba(254, 10, 10, 0.733)"

    return(
        <div className='slidebar-bg-container'>
            <div className='slidebar-fliter-feilds-container'>
                <Link to="/"  className={`slidebar-filter-feild-sub-container ${homeBgColor}`} style={{color : darkModeTextColor}} onClick={handleHomeBgColor} >
                    <MdHome className="slidebar-home-icon" style={{color : homeLogoColor}}/>
                    <h3>Home</h3>
                </Link>
                <Link to="/trending" className={`slidebar-filter-feild-sub-container ${trendingBgColor}`} style={{color : darkModeTextColor}} onClick={handleTrendingBgColor}>
                    <HiFire className="slidebar-home-icon" style={{color : trendingLogoColor}}/>
                    <h3>Trending</h3>
                </Link>
                <Link to="/gaming" className={`slidebar-filter-feild-sub-container ${gamingBgColor}`} style={{color : darkModeTextColor}} onClick={handleGamingBgColor}>
                    <SiYoutubegaming className="slidebar-home-icon" style={{color : gamingLogoColor}}/>
                    <h3>Gaming</h3>
                </Link>
                <Link to="/liked-videos" className={`slidebar-filter-feild-sub-container ${likdedVideoBgColor}`} style={{color : darkModeTextColor}} onClick={handleLikedVideoBgColor}>
                    <MdOutlinePlaylistAdd className="slidebar-home-icon" style={{color : likedVideosLogoColor}}/>
                    <h3>Saved videos</h3>
                </Link>
            </div>
            <div className="slidebar-footer-container" style={{color : darkModeTextColor}}> 
                <h2>CONTACT US</h2>
                <div>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" className="contact-us-logos"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png " className="contact-us-logos"/>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" className="contact-us-logos"/>
                </div>
                <h3>Enjoy! Now to see your channels and recommendations!</h3>
            </div>
        </div>
    )
}
export default SlideBar