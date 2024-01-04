import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'


export function AppHeader({isSignup, setIsSignUp}) {
  


    return (
        <div className="app-header">
            <div className="page-index">
          <button> {'<'}</button>
          <button> {'>'} </button>
           </div>
           <div className="login-signup"> 
           <button onClick={setIsSignUp(true)}>  <Link to={`../login`}>Sign up</Link></button>
           <button className="login"> <Link to={`../login`}>Log in</Link></button>
           </div>

        </div>
    )
}