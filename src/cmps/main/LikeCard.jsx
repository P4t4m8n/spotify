import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"
import { Heart } from '../../services/icons.service'
import { FullHeart } from '../../services/icons.service'


export function LikeCard({ item }) {
    
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    console.log("item:", item)
    
    useEffect(() => {
        let LikeCheck
        if (user ) {
            
            if (item.type === 'Playlist') LikeCheck = user.stations.some(station => station._id === item._id)
            if (item.type === 'song') LikeCheck = user.stations[0].songs.some(song => song._id === item._id)
            console.log("LikeCheck:", LikeCheck)

            if (LikeCheck) setIsLiked(true)
            else setIsLiked(false)
        }

    }, [item,isLiked])

    async function onLike() {
        if (!user) {
            console.log('No user found')
            return
        }
    
        let userToUpdate
    
        if (item.type === 'Playlist') {
            userToUpdate = handlePlaylistLike(user, item, isLiked, setIsLiked)
        } else if (item.type === 'song') {
            userToUpdate = handleSongLike(user, item, isLiked, setIsLiked)
            console.log("userToUpdate:", userToUpdate)
        }
    
        try {
            await updateUser(userToUpdate)
        } catch (err) {
            console.error('Error updating user:', err)
        }
    }
    
    function handlePlaylistLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        if (isLiked) {
            updatedStations = updatedStations.filter(station => station._id !== likedItem._id)
            setIsLikedCallback(false)
        } else {
            updatedStations = [...updatedStations, likedItem]
            setIsLikedCallback(true)
        }
        return { ...user, stations: updatedStations }
    }
    
    function handleSongLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        let favSongs = updatedStations[0].songs
    
        if (isLiked) {
            favSongs = favSongs.filter(fav => fav._id !== likedItem._id)
            setIsLikedCallback(false)
        } else {
            favSongs .push(likedItem)
            setIsLikedCallback(true)
        }
    
        updatedStations[0].songs = favSongs
        console.log("favSongs:", favSongs)
        return { ...user, stations: updatedStations }
    }
    // console.log('render like')

    return (
        <button className={"like animate__animated " + (isLiked ? 'fill animate__shakeX' : 'empty animate__heartBeat')} onClick={onLike}>
            {isLiked && <FullHeart />}
            {!isLiked && <Heart />}
        </button>

    )
}