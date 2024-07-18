import { FaMoon } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import Cookies from 'js-cookie'
import './index.css'
import { useNavigate } from "react-router-dom";

const Header = props => {
    const {isDarkMode, toggleLightDarkMode} = props
    const handleLightDarkMode = () => {
        toggleLightDarkMode()
    }
    
    
    const nxtWatchLogo = isDarkMode ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"

    const buttonStyle = isDarkMode && "button-dark-mode-style"
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    return(
        <div className='header-bg-container'>
            <div className="header-nxt-watch-logo-container">
                <img src={nxtWatchLogo} className='header-nxt-watch-logo'/>
            </div>
            <div className="header-nxt-watch-light-mode-profie-logout-container">
                {isDarkMode ?
                 <MdLightMode className="light-icon" onClick={handleLightDarkMode}/>
                 :
                 <FaMoon className="half-moon-icon" onClick={handleLightDarkMode}/>
                }
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" className="profile-logo"/>
                <button className={`logout-button ${buttonStyle}`} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
export default Header