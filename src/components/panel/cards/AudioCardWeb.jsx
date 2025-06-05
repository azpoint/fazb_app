"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

function AudioCardWeb({ audio, description }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); //New state for volume

    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => {
            const currentAudio = audioRef.current;
            if (!currentAudio) return;

            setDuration(currentAudio.duration || 0);
            setCurrentTime(currentAudio.currentTime);
        };

        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleAudioEnded = () => {
            setIsPlaying(false);
        };

        // Attach event listeners
        audio.addEventListener("loadedmetadata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);
        audio.addEventListener("ended", handleAudioEnded);

        // Handle cases where metadata is already loaded or needs re-triggering
        if (audio.readyState >= 1) {
            setAudioData();
        } else {
            audio.load();
        }

        // Cleanup function for event listeners
        return () => {
            audio.removeEventListener("loadedmetadata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
            audio.removeEventListener("ended", handleAudioEnded);
        };
    }, [volume]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="flex flex-col">
            {/* Waveform Image */}
            <div className="relative h-24 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:brightness-125">
                <Image
                    src={"/assets/audio-wave.webp"}
                    alt=""
                    fill={true}
                    className="bg-sky-600 opacity-20 z-0"
                    onClick={togglePlayPause}
                />
                <div className="absolute ml-4 mt-2 z-20">{description}</div>

                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? (
                        <FaPauseCircle className="w-12 h-12 text-rose-800 active:scale-95 cursor-pointer hover:text-rose-600 mx-auto" />
                    ) : (
                        <FaPlayCircle className="w-12 h-12 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700 mx-auto" />
                    )}
                </div>

                {/* Volume Control */}
                <div className="absolute right-4 bottom-2 z-50 flex gap-2">
                    <FaVolumeUp className="text-sky-950"/>
                    <input
                        type="range"
                        id="volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{ width: "100px" }} // Adjust width as needed
                    />
                </div>
            </div>

            <div className="mt-4">
                <audio ref={audioRef} src={audio} preload="metadata" />
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{ width: "100%" }}
                />

                <div className="flex justify-between">
                    <span>{formatTime(currentTime)}</span>
                    <span>{`Tiempo Total: ${formatTime(duration)}`}</span>
                </div>
            </div>
        </div>
    );
}

export default AudioCardWeb;
