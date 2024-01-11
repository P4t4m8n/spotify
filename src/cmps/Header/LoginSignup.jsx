import { useState } from 'react'
import { LoginForm } from './LoginForm.jsx'
import { NavLink, useNavigate } from 'react-router-dom'


// const { useState } = React

export function LoginSignup() {

    

    return (
        <section className="header-login">
                <div className="sign-up"> <NavLink to="/signup" >sign up</NavLink></div>
                <div className="login"><NavLink to="/login" >login</NavLink></div>
            {/* <LoginForm isSignup={isSignup}/> */}
           
        </section >
    )
}

