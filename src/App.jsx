
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { store } from './store/store.js'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import '../src/styles/main.scss'
import YouTubeAudioPlayer from './cmps/YouTubeAudioPlayer.jsx'
import { NavBar } from './cmps/NavBar.jsx'

export function App() {


  return (

    <>
      <Provider store={store}>
        <Router>
          <section className="main-layout app">
            <AppHeader  />
            <NavBar/>
            <main>
              <Routes>
                <Route path="/" element={<PlaylistIndex />} />
                <Route path="/:playlistId" element={<PlaylistDetails />} />
              </Routes>
              <YouTubeAudioPlayer></YouTubeAudioPlayer>
              <AppFooter />
            </main>
          </section>
        </Router>
      </Provider>
    </>
  )
}


