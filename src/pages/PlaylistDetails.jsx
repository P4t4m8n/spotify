import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadPlaylist } from "../store/actions/playlist.actions"


export function PlaylistDetails() {

    const [currPlaylist, setCurrPlaylist] = useState(null)
    const params = useParams()

    useEffect(() => {
        onLoadPlaylist()

    }, [params.playlistId])

    async function onLoadPlaylist() {
        const playlist = await loadPlaylist(params.playlistId)

        setCurrPlaylist(prevP => ({ ...currPlaylist, ...playlist }))
    }

    if (!currPlaylist) return <div>...Loading</div>


    const { playlistImgUrl, type, createdBy, name, duration, songs } = currPlaylist

    const amount = currPlaylist.songs.length

    // console.log('Render Playlist-details')
    return (
        <section className="playlist-page">
            <header>
                <img src={playlistImgUrl}></img>
                <div className="playlist-hero">
                    <p>{type}</p>
                    <p>{name}</p>
                    <p>{songs[0].title}</p>
                    <p>{songs[1].title}</p>
                    <p>{songs[2].title}</p>
                    <div>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount}</p>
                        <p>About: {duration}</p>
                    </div>
                </div>
            </header>

            <ul className="song-list">
                {

                    songs.map(song =>
                        <li key={song._id} className="flex full">
                            <div>
                                <button>p</button>
                                <img src={song.songImgUrl}></img>
                                <div>
                                    <p>{song.title}</p>
                                    <p>{song.artist}</p>
                                </div>
                            </div>

                            <p>{song.album}</p>
                            <div>
                                <button>like</button>
                                <p>{song.duration}</p>
                                <button>...</button>
                            </div>

                        </li>
                    )
                }
            </ul>
        </section>
    )

}