import { useSelector } from 'react-redux'
import { useLocation, Link, useParams } from 'react-router-dom'



import { Search } from '../support/Search.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { useState } from 'react'
import { logout } from '../../store/actions/user.actions.js'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    // const isSearchOpen = useSelector(storeState => storeState.appMoudle.isSearchOpen)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const params = useParams()


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
        const location = useLocation();
        const { searchTerm } = useParams();

        if (location.pathname === '/search' || location.pathname === `/search/:${searchTerm}`) {
            return <Search />;
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
                            <li >  <Link to={`user/${user._id}`}>Profile</Link></li>
                            <li onClick={onLogout}>Logout</li>
                        </ul>
                    }
                    <p className='user-buttons grid'>

                        Hello <span>  {user.username}</span>

                        <div className='user-image-container flex'>
                            <img src={user.imgUrl ? user.imgUrl : `/src/assets/img/user.svg`}></img>
                        </div>
                    </p>
                </ section >
            ) : (
                <section className='contents'>
                    <LoginSignup />
                </section>
            )}
        </div>


    )
}

