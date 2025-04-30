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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

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

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!currentSong) {
    return (
      <div className="hidden lg:flex w-[950px] min-h-[100px] flex items-center justify-center text-gray-400 bg-[#121212] rounded-2xl my-2">
        Select a song to start playing
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

  const handleFavourites = (e) => {
    e.stopPropagation();
    toggleFavourtie(currentSong);
  };

  const handleExpand = () => {
    if (window.innerWidth < 1024) setIsExpanded(true);
  };

  const handleCollapse = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div
      onClick={handleExpand}
      className={`fixed bottom-0 left-0 w-full bg-[#121212] text-white p-3 sm:p-4 rounded-t-2xl transition-all duration-500 z-40
        ${
          isExpanded
            ? "h-full pt-25 overflow-y-auto"
            : "h-16 flex items-center justify-between"
        }
        lg:static lg:h-auto lg:rounded lg:cursor-default lg:flex-col lg:items-center lg:justify-start lg:w-[60%] my-2`}
      style={{
        background:
          isExpanded || window.innerWidth >= 1024
            ? `linear-gradient(160deg, ${dominantColor || "#1e1e1e"}, #121212)`
            : "#121212",
      }}
    >
      {isExpanded || isDesktop ? (
        <>
          <div className="flex justify-between w-full items-center ">
            <div />
            <button
              onClick={handleCollapse}
              className="text-gray-400 text-2xl  font-bold focus:outline-none lg:hidden"
            >
              ❌
            </button>
          </div>
          <img
            src={currentSong.cover}
            alt="cover"
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-square rounded-xl object-cover shadow-md mx-auto mb-4"
          />
          <div className="text-center px-2 mb-4">
            <h2 className="text-white text-lg sm:text-xl font-semibold mb-1 truncate">
              {currentSong.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base truncate">
              {currentSong.artist}
            </p>
          </div>

          <div className="w-full px-2 sm:px-6 mb-4">
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
              <div className="absolute right-0 -bottom-6 text-[10px] sm:text-sm text-gray-400">
                {formatTime(progress)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          <div className=" mt-4 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-6 ">
              <img
                src={assets.arrow_left}
                alt="prev"
                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
                onClick={playPrev}
              />
              <img
                src={isPlaying ? assets.pause_icon : assets.play_icon}
                alt="play/pause"
                className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                onClick={togglePlayPause}
              />
              <img
                src={assets.arrow_right}
                alt="next"
                className="w-6 h-6 sm:w-7 sm:w-7 cursor-pointer"
                onClick={playNext}
              />
            </div>
            <img
              src={assets.like_icon}
              alt="fav"
              className={`w-6 h-6  cursor-pointer  transition-opacity duration-200 ${
                isFav(currentSong.id) ? "opacity-100" : "opacity-40"
              }`}
              onClick={handleFavourites}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 w-full">
            <img
              src={currentSong.cover}
              alt="cover"
              className="w-10 h-10 rounded-md"
            />
            <div className="flex-1 overflow-hidden">
              <h2 className="truncate text-white text-sm font-semibold">
                {currentSong.title}
              </h2>
              <p className="truncate text-xs text-gray-400">
                {currentSong.artist}
              </p>
            </div>
            <img
              src={isPlaying ? assets.pause_icon : assets.play_icon}
              alt="play/pause"
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
