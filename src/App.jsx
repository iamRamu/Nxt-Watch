import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LogIn from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import AllVideos from './components/AllVideos'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import LikedVideos from './components/LikedVideos'
import BrowseVideoDetails from './components/BrowseVideoDetails'
const App = () => {
  return(
    <div className='app-bg-container'>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}>
                  <Route path='/' element={<AllVideos/>}/>
                  <Route path='/trending' element={<Trending/>}/>
                  <Route path='/gaming' element={<Gaming/>}/>
                  <Route path='/liked-videos' element={<LikedVideos/>}/>
                  <Route path="/videos/:id" element={<BrowseVideoDetails/>}/>
              </Route>
              <Route path='/login' element={<LogIn/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
      </div>
  )
}
export default App