
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { store } from './store/store.js'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import { SideBar } from './cmps/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { VideoInfoComponent } from './cmps/VideoInfo.jsx'
import { RightSidebar } from './cmps/RightSidebar.jsx'
import { useState } from 'react'
import { PlaylistEdit } from './cmps/PlaylistEdit.jsx'

import '../src/styles/main.scss'
// import '../trash/tempCss.css'

export function App() {

  const [isExpanded, setIsExpanded] = useState(false)


  // this relates to the RightSidebar
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    console.log('+++++++++++++++++Toggle RightSidebar');
  }

  return (

    <>
      <Provider store={store}>
        <Router>
          <section className={`main-container ${isExpanded ? 'expanded' : ''}`}>
            {/* <AppHeader /> */}
            <SideBar />
            {/* <VideoInfoComponent></VideoInfoComponent> */}

            <Routes>
              {/* <Route path="" element={<SideBar />} /> */}

              <Route path="/" element={<PlaylistIndex />} />
              <Route path="/:playlistId" element={<PlaylistDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/:userId/playlist/edit" element={<PlaylistEdit />}></Route>
              <Route path="/:userId/playlist/edit/:playlistId" element={<PlaylistEdit />}></Route>
            </Routes>

            <RightSidebar />
            <AppFooter onToggleExpansion={toggleExpansion} />
          </section>
        </Router>
      </Provider>
    </>
  )
}


