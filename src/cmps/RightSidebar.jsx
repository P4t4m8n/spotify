import { useSelector } from "react-redux"


export function RightSidebar() {

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    return (
        <div className="right-sidebar">
            <div className="flex">
                <h3>Station(playlist) Title</h3>
                <button>❎</button>
            </div>
        </div>
    )
}