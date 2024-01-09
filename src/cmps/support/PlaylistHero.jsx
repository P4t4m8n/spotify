

export function PlaylistHero({ handleChange, stationToEdit }) {

    const { type, name, amount, createdBy, duration, stationImgUrl } = stationToEdit


    return (
        <header>
            <form>
                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
                    <img style={{ height: '2rem', width: '2rem' }} className="upload-img" src={stationImgUrl || "/src/assets/img/upload.png"}></img>
                </label>
                <div className="station-hero">
                    <p>{type}</p>
                    <input value={name} id="name" type="text" name="name" onChange={handleChange}></input>
                </div>
                <div>
                    <p>{createdBy.username || 'Spotify'}</p>
                    <p>{amount || ''}</p>
                    <p>duration: {duration || ''}</p>
                </div>
            </form>
        </header>
    )
}