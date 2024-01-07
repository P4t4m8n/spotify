import { useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user.actions";
import { useEffect, useState } from "react";


export function PlayerPlayingCard() {

    const [isLiked, setisLiked] = useState(false)

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    useEffect(() => {

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
        updateUser(userToUpdate)
    }




    return (
        <div className="playing-card flex" >
            <img src={song.songImgUrl} style={{ width: '50px' }}></img>
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
            </div>
            <button  onClick={onLike}>{(!isLiked) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button>
        </div>

    )
}