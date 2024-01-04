

//routes here

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { store } from './store/store.js'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import '../src/styles/main.scss'



export function App() {


  return (
    <>
      <Provider store={store}>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<PlaylistIndex />} />
            <Route path="/:playlistId" element={<PlaylistDetails />} />
          </Routes>
          <AppFooter />
        </Router>
      </Provider>
    </>
  )
}


