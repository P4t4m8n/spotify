
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { store } from './store/store.js'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import '../src/styles/main.scss'
import { SideBar } from './cmps/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { VideoInfoComponent } from './cmps/VideoInfo.jsx'

export function App() {


  return (

    <>
      <Provider store={store}>
        <Router>
          <section className="main-layout app">
            <AppHeader />
            <SideBar />
            <main>
              {/* <VideoInfoComponent></VideoInfoComponent> */}
              <Routes>
                {/* <Route path="" element={<SideBar />} /> */}
                <Route path="/" element={<PlaylistIndex />} />
                <Route path="/:playlistId" element={<PlaylistDetails />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </main>
            <AppFooter />
          </section>
        </Router>
      </Provider>
    </>
  )
}


