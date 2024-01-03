import { useState } from 'react'

import '../src/styles/main.scss'

//routes here

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'




export function App() {


  return (
    <div>
      <AppHeader />
      <AppFooter />
    </div>

  )
}


