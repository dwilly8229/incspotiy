import React, { useContext, useState, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrev,
    audioRef,
    toggleFavourtie,
    isFav,
    dominantColor,
  } = useContext(PlayerContext);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", setAudioDuration);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
      }
    };
  }, [audioRef, currentSong]);

  if (!currentSong) {
    return (
      <div className="w-[50%] m-2 px-6 pt-4 rounded bg-[#121212] rounded-xl text-white overflow-auto lg:w-[75%] lg:ml-0 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500">Select a song to start playing</p>
      </div>
    );
  }

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleFavourites = () => {
    toggleFavourtie(currentSong);
  };

  return (
    <div
      className="w-[60%] min-w-[300px] min-h-[350px] m-2 px-6 pt-4 rounded bg-[#121212] rounded-xl text-white overflow-auto lg:w-[75%] lg:ml-0 flex flex-col items-center transition-all duration-500"
      style={{
        background: `linear-gradient(160deg, ${
          dominantColor || "#1e1e1e"
        }, #121212)`,
      }}
    >
      <img
        src={currentSong.cover}
        alt="cover"
        className="w-100 h-100 rounded-xl object-cover shadow-md mb-4"
      />

      <div className="text-center mb-4">
        <h2 className="text-white text-2xl font-semibold mb-1">
          {currentSong.title}
        </h2>
        <p className="text-gray-400 text-lg">{currentSong.artist}</p>
      </div>

      <div className="w-full px-6 mb-4">
        <div className="relative">
          <div
            className="h-2 w-full bg-gray-700 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>
          <div className="absolute right-0 -bottom-6 text-xs text-gray-400">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <div className=" mt-4 h-10 flex items-center justify-center">
        <div className="flex items-center justify-center gap-6 ">
          <img
            src={assets.arrow_left}
            alt="prev"
            className="w-6 h-6 cursor-pointer"
            onClick={playPrev}
          />
          <img
            src={isPlaying ? assets.pause_icon : assets.play_icon}
            alt="play/pause"
            className="w-8 h-8 cursor-pointer"
            onClick={togglePlayPause}
          />
          <img
            src={assets.arrow_right}
            alt="next"
            className="w-6 h-6 cursor-pointer"
            onClick={playNext}
          />
        </div>
        <img
          src={assets.like_icon}
          alt="fav"
          className={`relative w-6 h-6  cursor-pointer  transition-opacity duration-200 ${
            isFav(currentSong.id) ? "opacity-100" : "opacity-40"
          }`}
          onClick={handleFavourites}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
