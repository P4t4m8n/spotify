
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import { SideBar } from './cmps/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RightSidebar } from './cmps/RightSidebar.jsx'
import { PlaylistEdit } from './cmps/PlaylistEdit.jsx'

import '../src/styles/main.scss'
// import '../trash/tempCss.css'

export function App() {



  return (
    <Router>
      <AppHeader />
      <SideBar />
      <Routes>
        <Route path="/" element={<PlaylistIndex />} />
        <Route path="/:playlistId" element={<PlaylistDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:userId/playlist/edit" element={<PlaylistEdit />}></Route>
        <Route path="/:userId/playlist/edit/:playlistId" element={<PlaylistEdit />}></Route>
      </Routes>
      <RightSidebar />
      <AppFooter />
    </Router>
  );
}
