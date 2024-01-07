import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../../services/user.service'

import { Search } from "../support/Search"



export function AppHeader() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)
    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))

    }

    function isLogin(ev) {
        ev.preventDefault()
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    function onLogin(credentials) {
        login(credentials)
            .then(() => {
                console.log('Logged in successfully')
            })
            .catch((err) => { console.log(err) })

    }

    function onSignup(credentials) {
        signup(credentials)
            .then(() => {
                console.log('Signed in successfully')
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div className="app-header">
            <div className="page-index">
                <button> <i className="fa-solid fa-chevron-left"></i></button>
                <button><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <Search />

            {/*<div className="login-signup">
                <form className="login-form" onSubmit={isLogin}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    {isSignup && <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />}
                    <button>{isSignup ? 'Signup' : 'Login'}</button>
                </form>
                <div className="login-btns">
                    <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                        {isSignup ?
                            'Already a member? Login' :
                            'New user? Signup here'
                        }
                    </a>
                    </div>*/}

            <div className="header-login">
                <a href="/login" className="sign-up">sign up</a>
                <button className="login"> </button>

            </div>
        </div>

    )
}