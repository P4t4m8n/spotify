import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"
import { Heart } from '../../services/icons.service'
import { FullHeart } from '../../services/icons.service'
import { saveStation } from "../../store/actions/station.actions"


export function LikeCard({ item }) {

    const [isLiked, setIsLiked] = useState(null)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const PLAYLIST = 'Playlist'
    const SONG = 'song'

    useEffect(() => {

        let LikeCheck
        if (user) {

            if (item.type === PLAYLIST) LikeCheck = user.stations.some(station => station._id === item._id)
            if (item.type === SONG) {
                LikeCheck = user.stations[0].songs.some(song => song._id === item._id)
            }
        }

        if (LikeCheck) setIsLiked(true)
        else setIsLiked(false)


    }, [item, user])

    async function onLike() {
        if (!user) {
            console.log('No user found')
            return
        }

        let userToUpdate

        if (item.type === PLAYLIST) {
            userToUpdate = handlePlaylistLike(user, item, isLiked, setIsLiked)
        } else if (item.type === SONG) {
            userToUpdate = handleSongLike(user, item, isLiked, setIsLiked)
        }

        try {
            if (item.type === SONG) saveStation(userToUpdate.stations[0])
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
            favSongs.push(likedItem)
            setIsLikedCallback(true)
        }

        updatedStations[0].songs = favSongs
        return { ...user, stations: updatedStations }
    }
    // console.log('render like')
    return (
        <button className={"like animate__animated " + (isLiked ? 'fill empty animate__heartBeat' : 'fill animate__shakeX')} onClick={onLike}>
            {isLiked ? <FullHeart /> : <Heart />}
        </button>

    )
}