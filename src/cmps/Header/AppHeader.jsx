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
    const [showCreateModal, setShowCreateModal] = useState(false)


    async function onLogout() {
        try {
            await logout()
            console.log('logout')
        }
        catch (err) {
            console.log(err)
        }
    }


    console.log('render apphedaer')
    return (
        <div className="app-header">
            <div className="page-index">
                <button><img src='src\assets\img\page.svg'></img></button>
                <button><img src='src\assets\img\page.svg'></img></button>
            </div>

            {user ? (
                < section className='user-form' onClick={() => setShowCreateModal(!showCreateModal)} >
                    {showCreateModal &&
                            <ul className="show-create-modal clean-list context user-modal">
                                <li>
                                    Profile
                                </li>
                                <li onClick={onLogout}>Logout</li>
                            </ul>
                            }
                    <span >
                    <img src = {user.imgUrl? user.imgUrl : `src/assets/img/user.svg`}></img>  Hello {user.username} </span>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </div>


    )
}

/*  <p onClick={() => setShowCreateModal(!showCreateModal)} className="inline-block">
                        <span title="Create station or folder">
                            <img src="src\assets\img\plus.svg" className="left-sidebar-plus-icon"></img>
                        </span>
                    </p>
                    {showCreateModal &&

                        <ul className="show-create-modal clean-list context">

                            <li onClick={createStation}>
                                <span>🎵</span>Create a new station
                            </li>
                            <li><span>📁</span>Create a station folder</li>
                        </ul>
                    }*/