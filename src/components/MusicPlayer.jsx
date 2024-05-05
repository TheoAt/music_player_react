import { useEffect, useRef, useState } from 'react';
import './music.css'

export default function MusicPlayer() {

    const tracks = [
        {
            title: "Track 1",
            source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Track 2",
            source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            image: "https://via.placeholder.com/150",
        },
        // Add more tracks as needed
    ];

    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentMusic, setCurrentMusic] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setTrackProgress(
                    (audioRef.current.currentTime / audioRef.current.duration) * 100
                );
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [isPlaying])

    const handlePlayAndPause = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    const handleSkipMusic = (getDirection) => {
        if (getDirection === "forward") {
            setCurrentMusic((prevTrack) => (prevTrack + 1) % tracks.length);
        } else if (getDirection === "backward") {
            setCurrentMusic(
                (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length
            );
        }

        setTrackProgress(0);
        setIsPlaying(true)
    }

    return (
        <div className="music-player-container">
            <h2 className="music-title">{tracks[currentMusic].title}</h2>
            <img src={tracks[currentMusic].image} alt={tracks[currentMusic].title} className="music-img" />
            <audio ref={audioRef} src={tracks[currentMusic].source} />

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{
                        width: `${trackProgress}%`,
                        background: isPlaying ? "#3498db" : "#a43636",
                        height: '16px'
                    }}
                ></div>
            </div>

            <div className="music-controls">
                <button onClick={() => handleSkipMusic('backward')} disabled={currentMusic === 0}>Backward</button>
                <button onClick={handlePlayAndPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={() => handleSkipMusic('forward')} disabled={currentMusic === tracks.length - 1}>Forward</button>
            </div>
        </div>
    )
}