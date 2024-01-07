import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../services/user.service'

import { Search } from "../support/Search"






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

    return (
        <div className="app-header">
            <div className="page-index">
                <button> <i className="fa-solid fa-chevron-left"></i></button>
                <button><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <Search />

           

            <div className="header-login">
                {/*user? 
                <div>`${user.url}`<h3>Hello {user.username}</h3></div> :*/
                <div className="sign-up"><a href="/sighup">sign up</a>
                <button className="login"><a href="/login">login </a></button>
                </div>}

            </div>
        </div>

    )
}