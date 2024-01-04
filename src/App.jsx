import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'



//routes here

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import { store } from './store/store.js'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import '../src/styles/main.scss'
import { store } from './store/store.js'
import { LoginSignup } from './pages/LoginSignup.jsx'




//import { store } from './store.js'



export function App() {
  const [isSignup, setIsSignUp] = useState(false)


  return (

    <>
      <Provider store={store}>
        <Router>
          <section className="main-layout app">
            <AppHeader isSignup={isSignup} setIsSignUp={setIsSignUp} />
            <main>
              <Routes>
                <Route path="/" element={<PlaylistIndex />} />
                <Route path="/:playlistId" element={<PlaylistDetails />} />
                <Route element={<LoginSignup isSignup={isSignup} />} path="/login" />
              </Routes>
              <AppFooter />
            </main>
          </section>
        </Router>
      </Provider>
    </>
  )
}


