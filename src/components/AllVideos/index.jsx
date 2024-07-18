import { useEffect, useState } from 'react'
import {X} from 'lucide-react'
import { Search } from 'lucide-react'
import Cookies from 'js-cookie'
import './index.css'
import VideoItem from '../VideoItem'
import { useOutletContext } from 'react-router-dom'
import {DNA} from 'react-loader-spinner'

let isBannerAvailabeL = true

const AllVideos = props => {
    const CustomProps = useOutletContext()
    //console.log("custom-props", CustomProps)
    const {isDarkMode} = props
    const [isBannerAvailabel, setIsBannerAvailable] = useState(isBannerAvailabeL)
    const [allVideos, setAllVideos] = useState(null)
    const [searchFilteredResults, setSearchFilteredResults] = useState(allVideos)
    const [userSearch, setUserSearch] = useState("")
    
    const handleBannerVisibility = () => {
        setIsBannerAvailable(false)
        isBannerAvailabeL = false
    }
    //console.log("allvideos dark mode", isDarkMode)
    const token = Cookies.get("jwt_token")
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${userSearch}`
    const options = {
        method : "GET",
        headers : {
            Authorization : `Berer ${token}`
        }
    }
    
    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const response = await fetch(apiUrl, options)
                const data = await response.json()
                setAllVideos(data.videos)
                setSearchFilteredResults(data.videos)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchAllVideos()
    },[token, isBannerAvailabel])

    const getUserSearchResults = () => {
        if(searchFilteredResults){
            const searchResults = allVideos.filter(each => {
               return each.title.toLowerCase().includes(userSearch.toLocaleLowerCase())
            })
            setSearchFilteredResults(searchResults)
        }
    }

    return(
        <div className={`all-videos-bg-container`}>
            {isBannerAvailabel &&
                <div className='banner-logo'>
                    <div className='inside-banner-top-container'>
                        <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png' alt='nxt-watch-logo' className='banner-nxt-watch-logo'/>
                        {/* <button className='close-banner-button' onClick={handleBannerVisibility}>X</button> */}
                        <X onClick={handleBannerVisibility} className='close-banner-button'/>
                    </div>
                    <h2 className='premium-description'>Buy Nxt Watch Premium prepaid plans with <br/> UPI</h2>
                    <button className='get-it-now-button'>GET IT NOW</button>
                </div>
            }
            <div className={`search-container`}>
                <input className='video-search-input' placeholder='Search' onChange={e => setUserSearch(e.target.value)}/>
                <div className='search-icon-container'>
                    <Search className='search-icon' onClick={getUserSearchResults}/>
                </div>
            </div>

            <div className={`all-videos-div-container`}>
                {searchFilteredResults && searchFilteredResults.length === 0  ?
                    <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png' className='no-videos-available-img' alt='No Videos'/>
                    :
                    searchFilteredResults ?
                     searchFilteredResults.map(eachVideo => <VideoItem videoDetails={eachVideo} key={eachVideo.id} isDarkModeActive={CustomProps}/>)
                     :
                     <div className='dna-loading-container'>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }
                
            </div>
            
        </div>
    )
}
export default AllVideos