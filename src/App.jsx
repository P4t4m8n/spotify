
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { AppHeader } from './cmps/Header/AppHeader.jsx'
import { Player } from './cmps/Footer/Player.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { LeftSidebar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { RightSidebar } from './cmps/RightSidebar/RightSidebar.jsx'
import { StationEdit } from './pages/StationEdit.jsx'
import { Login } from './pages/Login.jsx'
import { Sighup } from './pages/Sighup.jsx'



import '../src/styles/main.scss'
// import '../src/footer.css'

export function App() {

  const isOpen = useSelector(storeState => storeState.appMoudle.isOpen);
  const expandedClass = isOpen ? 'expanded' : '';

  return (
    <div className={`main-container ${expandedClass}`}>
      <Router>

        <LeftSidebar />
        {/* <AppHeader /> */}
        <Routes>
          <Route path="/" element={<StationIndex />} />
          <Route path="/:stationId" element={<StationDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sighup" element={<Sighup />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:userId/station/edit" element={<StationEdit />}></Route>
          <Route path="/:userId/station/edit/:stationId" element={<StationEdit />}></Route>
        </Routes>

        <RightSidebar />
        <Player />
      </Router>
    </div>
  )
}
