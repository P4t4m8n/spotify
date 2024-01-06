import '../src/styles/main.scss';

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startResizing, stopResizing, resizeSidebar } from './store/actions/sidebar.actions'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import { SideBar } from './cmps/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { VideoInfoComponent } from './cmps/VideoInfo.jsx';
import { RightSidebar } from './cmps/RightSidebar.jsx'
import { PlaylistEdit } from './cmps/PlaylistEdit.jsx'

import '../src/styles/main.scss'
// import '../trash/tempCss.css'

export function App() {
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()
  const sidebarWidth = useSelector((state) => state.sidebarModule?.width || 'defaultWidth');
  const isSidebarResizing = useSelector((state) => state.sidebarModule?.isResizing || false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseDown = () => {
    dispatch(startResizing());
  };

  const handleMouseUp = () => {
    if (isSidebarResizing) {
      dispatch(stopResizing());
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (isSidebarResizing) {
      const newWidth = Math.min(Math.max(e.clientX, 200), document.body.clientWidth - 400); // Enforce min and max width
      dispatch(resizeSidebar(newWidth));
    }
  };


  return (
    <Router>
      <div
        className="app"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // To handle the case where the mouse leaves the window
      >
        <div className={`main-container ${isExpanded ? 'expanded' : ''}`}>
          <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
            <SideBar />
            <div className="resizer" onMouseDown={handleMouseDown} />
          </div>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PlaylistIndex />} />
              <Route path="/:playlistId" element={<PlaylistDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/:userId/playlist/edit" element={<PlaylistEdit />}></Route>
              <Route path="/:userId/playlist/edit/:playlistId" element={<PlaylistEdit />}></Route>
            </Routes>
          </main>
          <RightSidebar className="right-sidebar" onToggle={toggleExpansion} />
          <AppFooter className="app-footer" onToggleExpansion={toggleExpansion} />
        </div>
      </div>
    </Router>
  );
}
