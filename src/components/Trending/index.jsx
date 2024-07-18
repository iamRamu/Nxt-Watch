import Cookies from 'js-cookie'
import "./index.css"
import { FaFire } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import TrendingVideoItem from '../TrendingVideoItem'
import { DNA } from 'react-loader-spinner'

const Trending = () => {
    const [trendingVideos, setTrendingVideos] = useState(null)

    const navigate = useNavigate()
    const token = Cookies.get("jwt_token")
    
    const apiUrl = "https://apis.ccbp.in/videos/trending"
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
                    // console.log("trending response", response)
                    // console.log("trending data", data)
                    if(response.ok){
                        setTrendingVideos(data.videos)
                    }
                    
                } catch (error) {
                    console.log("trending-api-error", error)
                }
            }
            getFetedData()
        }
    },[token])

    return(
        <div className="trending-bg-container">
            <div className="trending-header-container">
                <FaFire className="trending-fire-icon"/>
                <h2>Trending</h2>
            </div>
            <div>
                {trendingVideos ?
                    trendingVideos.map(eachTrendingVideo => <TrendingVideoItem trendingVideoDetails={eachTrendingVideo} key={eachTrendingVideo.id}/>)
                    :
                    <div className='trending-dna-loader-container'>
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
export default Trending