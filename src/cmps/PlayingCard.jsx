import { useSelector } from "react-redux";
import { update } from "../store/actions/user.actions";
import { useEffect, useState } from "react";


export function PlayingCard() {

    const [isLiked, setisLiked] = useState(false)

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    useEffect(() => {

        console.log("user:", user)
        setisLiked(user.playlists[0].songs.some(fav => fav === song._id))

    }, [user, isLiked])

    function onLike() {
        let userToUpdate
        let newFav = []
        if (isLiked) {
            console.log('dislike')
            newFav = user.playlists[0].filter(fav => fav !== song._id)
        }
        else {
            console.log('like')
            newFav = user.playlists[0]
            newFav.push(song._id)

        }
        userToUpdate = { ...user, playlists: playlists.splice(0, 1, newFav) }
        update(userToUpdate)
    }




    return (
        <div className="playing-card flex" >
            <img src={song.songImgUrl} style={{ width: '50px' }}></img>
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
            </div>
            <button style={{ color: 'black' }} onClick={onLike}>{(!isLiked) ? 'liked' : 'unLikeed'}</button>
        </div>

    )
}