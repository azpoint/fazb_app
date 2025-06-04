"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

function AudioCard({ audio, id, handleAudioCard, description, visibility }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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

        // Handle cases where metadata is already loaded or needs re-triggering ---
        if (audio.readyState >= 1) {
            // 1 (HAVE_METADATA) or higher means metadata is available

            setAudioData(); // Call setAudioData immediately
        } else {
            // If not ready, call load() to force the browser to load and dispatch events
            // This is useful if the src changed or event was missed
            audio.load();
        }

        // Cleanup function for event listeners
        return () => {
            audio.removeEventListener("loadedmetadata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
            audio.removeEventListener("ended", handleAudioEnded);
        };
    }, []);

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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="flex flex-col">
            <div
                className="relative aspect-[2/1.5] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:brightness-125"
                id={id}
                onClick={handleAudioCard}
            >
                <Image
                    src={"/assets/audio-wave.webp"}
                    alt=""
                    fill={true}
                    sizes="1x"
                    className="bg-sky-400 opacity-20"
                />
                <div className="absolute">{description}</div>

                <div
                    className={`absolute top-0 w-full h-full bg-red-500/60 ${visibility}`}
                />
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

                <div onClick={togglePlayPause} className="mt-4">
                    {isPlaying ? (
                        <FaPauseCircle className="w-12 h-12 text-rose-800 active:scale-95 cursor-pointer hover:text-rose-600 mx-auto" />
                    ) : (
                        <FaPlayCircle className="w-12 h-12 text-sky-900 active:scale-95 cursor-pointer hover:text-sky-700 mx-auto" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AudioCard;
