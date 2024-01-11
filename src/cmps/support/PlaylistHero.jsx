
export function PlaylistHero({ onSave, setStationToEdit, stationToEdit }) {



    const handleSubmit = (event) => {
        event.preventDefault();
        onSave()
    };

    const handleChange = (event) => {

        setStationToEdit(prev => ({ ...prev, name: event.target.value }))


    };

    return (
        <header>
            <form onSubmit={handleSubmit} className="flex">
                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
                    <img className="upload-img" src={stationToEdit.stationImgUrl || "/src/assets/img/upload.png"} alt="Upload"></img>
                </label>
                <section className="hero-right-section flex">

                    <div className="station-hero">
                        <p>{stationToEdit.type}</p>
                        <input
                            value={stationToEdit.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className="meta flex align-center">
                        <p>{stationToEdit.createdBy.username || 'Spotify'}</p>
                        <p>{stationToEdit.amount || ''}</p>
                        <p>duration: {stationToEdit.duration || ''}</p>
                        <button type="submit">Save Changes</button> {/* this is in here till we'll make edit modal*/}
                    </div>
                </section>

            </form>
        </header>
    );
}
// export function PlaylistHero({ handleChange, stationToEdit }) {

//     const { type, name, amount, createdBy, duration, stationImgUrl } = stationToEdit


//     return (
//         <header>
//             <form>
//                 <label htmlFor="file-input">
//                     <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
//                     <img style={{ height: '2rem', width: '2rem' }} className="upload-img" src={stationImgUrl || "/src/assets/img/upload.png"}></img>
//                 </label>
//                 <div className="station-hero">
//                     <p>{type}</p>
//                     <input value={name} id="name" type="text" name="name" onChange={handleChange}></input>
//                 </div>
//                 <div>
//                     <p>{createdBy.username || 'Spotify'}</p>
//                     <p>{amount || ''}</p>
//                     <p>duration: {duration || ''}</p>
//                 </div>
//             </form>
//         </header>
//     )
// }