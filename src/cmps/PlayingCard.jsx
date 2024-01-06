import { useSelector } from "react-redux";
import { update } from "../store/actions/user.actions";
import { useEffect, useState } from "react";


export function PlayingCard() {

    const [isLiked, setisLiked] = useState(false)

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    useEffect(() => {
        setisLiked(user.favorites.some(fav => fav === song._id))

    }, [user, isLiked])

    function onLike() {
        let userToUpdate
        if (isLiked) {
            console.log('dislike')
            const newFav = user.favorites.filter(fav => fav !== song._id)
             userToUpdate = { ...user, favorites: newFav }
        }
        else {
            console.log('like')
            const fav = user.favorites
            fav.push(song._id)
             userToUpdate = { ...user, favorites: fav }
        }
        update(userToUpdate)
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