import React, { useEffect, useState } from 'react';

const YouTubeAudioPlayer = () => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Function to initialize the YouTube player
    const initializePlayer = () => {
        if (window.YT) {
            const newPlayer = new window.YT.Player('youtube-audio-player', {
                height: '0',
                width: '0',
                videoId: 'K9mzg8ueiYA',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    loop: 1,
                    fs: 0,
                    cc_load_policy: 0,
                    iv_load_policy: 3,
                    autohide: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': (event) => {
                        setPlayer(newPlayer);
                        event.target.mute(); // Mute by default
                    },
                    'onError': (event) => {
                        console.error('YouTube Player Error:', event.data);
                    }
                }
            });
        } else {
            console.error('YouTube API not loaded');
        }
    };

    useEffect(() => {
        // Function to load the YouTube IFrame Player API
        const loadYouTubeScript = () => {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = initializePlayer;
        };

        if (!window.YT) {
            loadYouTubeScript();
        } else {
            initializePlayer();
        }

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, [isPlaying]);

    const togglePlayPause = () => {
        
        if (!player) return;
        
        if (isPlaying) {
            console.log('a')
            player.pauseVideo();
        } else {
            player.playVideo();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <div id="youtube-audio-player"></div>
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default YouTubeAudioPlayer;
