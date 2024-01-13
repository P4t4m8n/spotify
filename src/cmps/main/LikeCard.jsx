import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"
import { Heart } from '../../services/icons.service'
import { FullHeart } from '../../services/icons.service'


export function LikeCard({ item }) {

    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    useEffect(() => {
        let LikeCheck
        if (user && user.stations && user.stations.length) {

            if (item.type === 'playlist') LikeCheck = user.stations.some(station => station._id === item._id)
            if (item.type === 'song') LikeCheck = user.stations[0].songs.some(song => song._id === item._id)

            if (LikeCheck) setIsLiked(true)
            else setIsLiked(false)
        }

    }, [item])

    async function onLike() {
        if (!user) {
            console.log('noUser')
            return
        }

        let userToUpdate
        let newUserArr = []

        if (item.type === 'playlist') {
            newUserArr = user.stations
            if (isLiked) {
                newUserArr = newUserArr.filter(station => station._id !== item._id)
                setIsLiked(false)
            }
            else {
                newUserArr.push(item)
                console.log('like')
                setIsLiked(true)
            }
            userToUpdate = { ...user, stations: newUserArr }
        }

        else if (item.type === 'song') {


            let favArr = user.stations[0].songs
            if (isLiked) {
                console.log('dislike')
                favArr = favArr.filter(fav => fav._id !== item._id)
                setIsLiked(false)

            }
            else {
                console.log('like')
                favArr.push(item)
                setIsLiked(true)
                const stations = user.stations
                stations[0].push(favArr)

            }
            userToUpdate = { ...user, stations: stations }
        }
        try {

            await updateUser(userToUpdate)
        }
        catch (err) { console.log(err) }
    }
    // console.log('render like')

    return (
        <button className={"like animate__animated " + (isLiked ? 'fill animate__shakeX' : 'empty animate__heartBeat')} onClick={onLike}>
            {isLiked && <FullHeart />}
            {!isLiked && <Heart />}
        </button>

    )
}