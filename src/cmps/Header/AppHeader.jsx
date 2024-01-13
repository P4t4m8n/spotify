import { useSelector } from 'react-redux'
import { useLocation, Link, useParams } from 'react-router-dom'



import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { useState } from 'react'
import { logout } from '../../store/actions/user.actions.js'
import { Backwords, UserIcon } from '../../services/icons.service.jsx'
import { Forward } from '@mui/icons-material'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const isSearchOpen = useSelector(storeState => storeState.appMoudle.isSearchOpen)
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

    return (
        <div className="app-header">
          
            {isSearchOpen && <Search></Search>}


            
            {user ? (
                < section className='user-form' onClick={() => setShowCreateModal(!showCreateModal)} >
                    {showCreateModal &&
                        <ul className="show-create-modal clean-list context user-modal">
                            <li >  <Link to={`user/${user._id}`}>Profile</Link></li>
                            <li onClick={onLogout}>Logout</li>
                        </ul>
                    }
                    <div className='user-buttons grid'>

                        Hello <span>  {user.username}</span>
             

                        <div className='user-image-container flex'>
                            {user.imgUrl ? <img src={user.imgUrl}></img> : <UserIcon></UserIcon>}
                        </div>
               
                </ section >
            ) : (
                <section className='contents'>
                    <LoginSignup />
                </section>
            )}
        </div>


    )
}

