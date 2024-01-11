import { useSelector } from 'react-redux'
import {  useLocation , Link } from 'react-router-dom'



import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { useState } from 'react'
import { logout } from '../../store/actions/user.actions.js'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    
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

    function ConditionalSearchComponent() {
        let location = useLocation()

        if (location.pathname === '/search') {
            return <Search />
        }

        return null;
    }



    return (
        <div className="app-header">
            <div className="page-index">
                <button><img src='\src\assets\img\page.svg'></img></button>
                <button><img src='\src\assets\img\page.svg'></img></button>
            </div>
            <ConditionalSearchComponent />


            {user ? (
                < section className='user-form' onClick={() => setShowCreateModal(!showCreateModal)} >
                    {showCreateModal &&
                        <ul className="show-create-modal clean-list context user-modal">
                            <li >  <Link to={`user/${user._id}`}>Prifile</Link></li>
                            <li onClick={onLogout}>Logout</li>
                        </ul>
                    }
                    <span >
                        <img src={user.imgUrl ? user.imgUrl : `/src/assets/img/user.svg`}></img>  Hello {user.username} </span>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </div>


    )
}

