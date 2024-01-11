import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { userService } from '../services/user.service.js'

export function UserPage(){
    const [user, setUser] = useState(userService.getLoggedinUser())
   
    /*useEffect(() => {
        async function fetchUser(){
        try{
        const user = await userService.getLoggedinUser()
        console.log(user)
        setUser(user)
        }
        catch(err)
    {
      alert('There was a problem. please try again')
    }}
    fetchUser()
}, [])*/


    let user2={username: user.username,email:user.email}
    if (!user) return <h1>loadings....</h1>
    return user && <div>
        {console.log(user2.username)}
        <img src={user.imgUrl ? user.imgUrl : `/src/assets/img/user.svg`}></img> 
        <h3>Hello {user2.username} </h3>
        <h4>Email: {user2.email}</h4>
        {/*  <ul className="clean-list">
                    {
                        userStations.map(station =>
                            <Link key={station._id} to={'/1/station/edit/' + station._id}>
                                <li className="grid">
                                    <img className="station-image-left-sidebar" src={station.stationImgUrl}></img>
                                    <header>{station.name}</header>
                                    <p>
                                        <img src="\src\assets\img\pinned.svg" className="left-sidebar-pinned-icon"></img>

                                       
                                        <span className="station-type">{station.type}</span>
                                        <span>{station.songs.length} songs</span>
                                    </p>


                                   

                                </li>
                            </Link>
                        )
                    }
                </ul>*/ }
    </div>






   
}