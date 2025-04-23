import React, { useState, createContext, useRef, useEffect } from "react";
import { songsData } from "../assets/assets";
import {
  addToRecentlyPlayed,
  getFavourites,
  addToFavourites,
  getRecentlyPlayed,
} from "../utils/storage";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [favourites, setFavourites] = useState(getFavourites());
  const [recentlyPlayed, setRecentlyPlayed] = useState(getRecentlyPlayed());

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const toggleFavourtie = (song) => {
    addToFavourites(song);
    setFavourites(getFavourites());
  };

  const togglePlayPause = () => {
    if (!currentSong || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playSong = (song) => {
    console.log("Trying to play:", song.title);
    if (song.id === currentSong?.id) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      addToRecentlyPlayed(song);
      setRecentlyPlayed(getRecentlyPlayed());
    }
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songsData.length;
    setCurrentSong(songsData[nextIndex]);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    setCurrentSong(songsData[prevIndex]);
    setIsPlaying(true);
  };

  const isFav = (id) => favourites.some((s) => s.id === id);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        playNext,
        playPrev,
        audioRef,
        toggleFavourtie,
        isFav,
        recentlyPlayed,
      }}
    >
      <audio
        key={currentSong?.id}
        ref={audioRef}
        src={currentSong?.src}
        onEnded={playNext}
      />
      {children}
    </PlayerContext.Provider>
  );
};
