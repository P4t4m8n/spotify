import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { useState } from 'react'
import { logout } from '../../store/actions/user.actions.js'
import { UserIcon } from '../../services/icons.service.jsx'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const isSearchOpen = useSelector(storeState => storeState.appMoudle.isSearchOpen)

    const [showCreateModal, setShowCreateModal] = useState(false)

    const location = useLocation()
    console.log(location, 'location')
    const isSearchShown = location.pathname.includes('search')


    async function onLogout() {
        try {
            await logout()
            console.log('logout')
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="app-header">

            {isSearchShown && <Search />}



            {user ? (
                < section className='user-form' onClick={() => setShowCreateModal(!showCreateModal)} >

                    {showCreateModal &&
                        <ul className="show-create-modal clean-list context user-modal">
                            <li >  <Link to={`user/${user._id}`}>Profile</Link></li>
                            <li onClick={onLogout}>Logout</li>
                        </ul>
                    }
                    <div className='user-buttons grid'>
                        <div className='user-image-container flex'>
                            {user.imgUrl ? <img src={user.imgUrl}></img> : <UserIcon></UserIcon>}
                        </div>
                    </div>

                </ section >
            ) : (
                <section className='contents'>
                    <LoginSignup></LoginSignup>
                </section>
            )}
        </div>


    )
}

