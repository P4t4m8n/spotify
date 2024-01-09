

export function PlayCard({ trackId }) {



    return (
        <button onClick={(ev) => onPlayStation(ev, station._id)} className="play-button">
            {currStationId === station._id && isPlaying ? <img src="src\assets\img\pause.svg"></img> : <img src="src\assets\img\play.svg"></img>}
        </button>
    )
}