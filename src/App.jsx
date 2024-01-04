import { useState } from 'react'
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'


import '../src/styles/main.scss'

//routes here

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PlaylistIndex } from './pages/PlaylistIndex.jsx'
import {store} from './store/store.js'
import { LoginSignup } from './pages/LoginSignup.jsx'




//import { store } from './store.js'



export function App() {
  const [isSignup, setIsSignUp] = useState(false)


  return (
    <Provider store={store}>
    <Router>
        <section className="main-layout app">
            <AppHeader isSignup={isSignup} setIsSignUp={setIsSignUp}/>
            <main>
                <Routes>
                    <Route element={<PlaylistIndex />} path="/" />
                    <Route element={<LoginSignup isSignup={isSignup}/>} path="/login" />
                </Routes>
                <AppFooter />
            </main>
        </section>
    </Router>
</Provider>
)
}


