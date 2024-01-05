import React, { useState, useEffect } from 'react';

// Ensure you have installed react-youtube via npm or yarn
import YouTube from 'react-youtube';

const YouTubeAudioPlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Options for the YouTube player
  const opts = {
    height: '0', // Setting height and width to 0 to hide the video
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0, // Hide default YouTube controls
    },
  };

  // This function is triggered when the YouTube player is ready
  const onReady = (event) => {
    setPlayer(event.target);
  };

  // Toggles the play/pause state
  const togglePlayPause = () => {
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setPlaying(!playing);
  };

  // Effect to autoplay the video on load (optional)
  useEffect(() => {
    if (player) {
      player.playVideo();
      setPlaying(true);
    }
  }, [player]);

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      <button onClick={togglePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default YouTubeAudioPlayer;
