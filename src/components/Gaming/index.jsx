import Cookies from 'js-cookie'
import "./index.css"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { SiYoutubegaming } from 'react-icons/si'
import GamingVideoItem from '../GamingVideoItem'
import { DNA } from 'react-loader-spinner'

const Gaming = () => {
    const [gamingVideos, setGamingVideos] = useState(null)

    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    
    const apiUrl = "https://apis.ccbp.in/videos/gaming"
    const options = {
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect(()=> {
        if(token === undefined){
            navigate("/login")
        }else{
            const getFetedData = async () => {
                try {
                    const response = await fetch(apiUrl, options)
                    const data = await response.json()
                    // console.log("gaming response", response)
                    // console.log("gaming data", data)
                    if(response.ok){
                        setGamingVideos(data.videos)
                    }
                    
                } catch (error) {
                    console.log("gaming-api-error", error)
                }
            }
            getFetedData()
        }
    },[token])

    return(
        <div className="trending-bg-container">
            <div className="trending-header-container">
                <SiYoutubegaming className="trending-fire-icon"/>
                <h2>Gaming</h2>
            </div>
            <div className='gaming-all-videos-container'>
                {gamingVideos ?
                    gamingVideos.map(eachGamingVideo => <GamingVideoItem gamingVideoDetails={eachGamingVideo} key={eachGamingVideo.id}/>)
                    :
                    <div className='gaming-dna-loader-container'>
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
export default Gaming