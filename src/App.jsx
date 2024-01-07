
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/Header/AppHeader.jsx'
import { Player } from './cmps/Footer/Player.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { LeftSidebar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RightSidebar } from './cmps/RightSidebar/RightSidebar.jsx'
import { StationEdit } from './pages/StationEdit.jsx'

import '../src/styles/main.scss'

export function App() {

  return (
    <Router>
      <LeftSidebar />

      <div className="main-content">
        <AppHeader />
        <Routes>
          <Route path="/" element={<StationIndex />} />
          <Route path="/:playlistId" element={<StationDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:userId/playlist/edit" element={<StationEdit />}></Route>
          <Route path="/:userId/playlist/edit/:playlistId" element={<StationEdit />}></Route>
        </Routes>
      </div>

      <RightSidebar />
      <Player />
    </Router>
  );
}
