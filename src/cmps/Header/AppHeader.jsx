import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate ,  useLocation} from 'react-router-dom'

import { UserMsg } from '../support/UserMsg.jsx'
import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../../services/user.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { SET_USER } from '../../store/redcuers/user.reducer.js'
import { useState } from 'react'







export function AppHeader() {


    
    const user=useSelector(storeState => storeState.userMoudle.userObj)
    //console.log(user)
    
    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    const dispatch = useDispatch()
    const navigate = useNavigate()


    function onLogout() {
        userService.logout(user._id)
            .then(() => {
                // DONE: use dispatch
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        // DONE: use dispatch
        // setUser(user)
        dispatch({ type: SET_USER, user })
        navigate('/')
    }

/*
    function onSignup(credentials) {
        signup(credentials)
            .then(() => {
                console.log('Signed in successfully')
            })
            .catch((err) => { console.log(err) })
    }*/

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

            {/*<div className="header-login">
                <div className="sign-up"> <NavLink to="/signup" >sign up</NavLink></div>
                <div className="login"><NavLink to="/login" >login</NavLink></div>
    </div>*/}
    {user ? (
                < section className='user-form' >
                    <span to={`/user/${user._id}`}>Hello {user.username} </span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup /*onSetUser={onSetUser}*/ />
                </section>
            )}
        </div>


    )
}