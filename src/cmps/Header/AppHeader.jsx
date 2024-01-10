import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../../services/user.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { SET_USER } from '../../store/redcuers/user.reducer.js'
import { useState } from 'react'
import { logout } from '../../store/actions/user.actions.js'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    //const isSearchOpen = useSelector(storeState => storeState.appMoudle.isSearchOpen)

    async function onLogout() {
        try {
            await logout()
            console.log('logout')
        }
        catch (err) {
            console.log(err)
        }
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


            {user ? (
                < section className='user-form' >
                    
                    <span >
                    <img src = {user.imgUrl? user.imgUrl : `src/assets/img/user.svg`}></img>  Hello {user.username} </span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </div>


    )
}