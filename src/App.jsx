
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/Header/AppHeader.jsx'
import { Player } from './cmps/Footer/Player.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import { LeftSidebar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RightSidebar } from './cmps/RightSidebar/RightSidebar.jsx'
import { PlaylistEdit } from './pages/PlaylistEdit.jsx'

import '../src/styles/main.scss'

export function App() {

  return (
    <Router>
      <LeftSidebar />

      <div className="main-content">
        <AppHeader />
        <Routes>
          <Route path="/" element={<PlaylistIndex />} />
          <Route path="/:playlistId" element={<PlaylistDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:userId/playlist/edit" element={<PlaylistEdit />}></Route>
          <Route path="/:userId/playlist/edit/:playlistId" element={<PlaylistEdit />}></Route>
        </Routes>
      </div>

      <RightSidebar />
      <Player />
    </Router>
  );
}
