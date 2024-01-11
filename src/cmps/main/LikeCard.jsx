

export function LikeCard({ item }) {

    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    function onLike() {
        let userToUpdate
        let newUserArr = []

        if (item.type === 'playlist') {
            newUserArr = user.stations
            if (isLiked) {
                console.log('dislike')
                newUserArr = newUserArr.filter(station => station._id === item._id)
            }
            else {
                newUserArr.push(item)
                console.log('like')

            }
            userToUpdate = { ...user, stations: newUserArr }
        }

        else if (typ === 'song') {

            if (isLiked) {
                console.log('dislike')
                newUserArr = user.favorites
                newUserArr = newUserArr.filter(fav => fav !== item._id)
            }
            else {
                console.log('like')
                newUserArr.push(item)
            }
            userToUpdate = { ...user, favorites: newUserArr }
        }
        updateUser(userToUpdate)
    }

    const liked = isLiked ? 'fill' : 'empty'

    return (
        <button onClick={onLike}> <img className="liked" src="/src/assets/img/like.svg"></img></button>

    )
}