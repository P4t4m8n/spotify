

export function ReightsideFooter({ player, volume, setVolume, onToggleExpansion }) {

    function handleVolumeChange(event) {
        const newVolume = parseInt(event.target.value, 10);
        setVolume(newVolume);
        if (player) {
            player.setVolume(newVolume);
        }
    }

    const handleToggleClick = () => {
        if (onToggleExpansion) {
            onToggleExpansion()
        }
    }

    return (
        <section className="rightside-footer">
            <button onClick={handleToggleClick}>onpen right modal</button>
            <button>lyrics</button>
            <button>queue</button>
            <div className="volume">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ width: '100%' }}
                />
            </div>
            <button>open mini player</button>
            <button>full screen</button>
        </section>
    )
}
