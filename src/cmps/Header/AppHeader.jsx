import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../services/user.service'

import { Search } from "../support/Search"
import { useLocation } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'







export function AppHeader() {

    const dispatch = useDispatch()


    //const user = useSelector(storeState => storeState.userMoudle.userObj)
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

    function ConditionalSearchComponent() {
        let location = useLocation()

        if (location.pathname === '/search') {
            return <Search />
        }

        return null; // or any other component for different routes
    }

    return (
        <div className="app-header">
            <div className="page-index">
                <button><img src='src\assets\img\page.svg'></img></button>
                <button><img src='src\assets\img\page.svg'></img></button>
            </div>
            <ConditionalSearchComponent />

            <div className="header-login">
                <div className="sign-up"> <NavLink to="/signup" >sign up</NavLink></div>
                <div className="login"><NavLink to="/login" >login</NavLink></div>
            </div>
        </div>


    )
}