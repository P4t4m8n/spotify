
import '../src/styles/main.scss'

//routes here

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import {store} from './store/store.js'



export function App() {


  return (
    <Provider store={store}>
      {/* <Router> */}
        {/* <AppHeader /> */}
        
        <PlaylistIndex></PlaylistIndex>
        {/* <Routes>

        </Routes> */}
        {/* <AppFooter /> */}
      {/* </Router> */}
    </Provider>
  )
}


