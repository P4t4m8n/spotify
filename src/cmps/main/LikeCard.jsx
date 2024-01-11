import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"



export function LikeCard({ item }) {

    const [isLiked, setIsLiked] = useState(false)
    console.log("isLiked:", isLiked)
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    console.log("user:", user)

    useEffect(() => {
        let LikeCheck
        if (user) {

            if (item.type === 'playlist') LikeCheck = user.stations.some(station => station._id === item._id)
            if (item.type === 'song') LikeCheck = user.favorites.some(song => song._id === item._id)

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
            console.log("newUserArr:", newUserArr)
            if (isLiked) {
                console.log('dislike')
                newUserArr = newUserArr.filter(station => station._id !== item._id)
                console.log("newUserArr:", newUserArr)
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

            newUserArr = user.favorites
            if (isLiked) {
                console.log('dislike')
                newUserArr = newUserArr.filter(fav => fav._id !== item._id)
                setIsLiked(false)

            }
            else {
                console.log('like')
                newUserArr.push(item)
                setIsLiked(true)

            }
            userToUpdate = { ...user, favorites: newUserArr }
        }
        try {

            await updateUser(userToUpdate)
        }
        catch (err) { console.log(err) }
    }

    return (
        <button className={"like " + (isLiked ? 'fill animate__shakeX' : 'empty animate__pulse')} onClick={onLike}>
            <img className="liked" src={isLiked ? "/src/assets/img/likeFull.svg" : "/src/assets/img/like.svg"} />
        </button>

    )
}