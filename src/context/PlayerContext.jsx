import React, { useState, createContext, useRef, useEffect } from "react";
import { songsData } from "../assets";
import {
  addToRecentlyPlayed,
  getFavourites,
  addToFavourites,
  getRecentlyPlayed,
} from "../utils/storage";
import ColorThief from "colorthief";
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [dominantColor, setDominantColor] = useState("#121212");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [favourites, setFavourites] = useState(getFavourites());
  const [recentlyPlayed, setRecentlyPlayed] = useState(getRecentlyPlayed());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    if (currentSong) {
      extractDominantColor(currentSong.cover);
    }
  }, [isPlaying, currentSong]);

  const togglePlayPause = () => {
    if (!currentSong || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName))
          return;
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause]);

  const extractDominantColor = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      setTimeout(() => {
        try {
          const colorTf = new ColorThief();
          console.log("Using updated extractDominantColor");
          const palette = colorTf.getPalette(img, 5);
          if (palette && palette.length > 0) {
            const [r, g, b] = palette[0];
            setDominantColor(`rgba(${r}, ${g}, ${b}, 0.2)`);
          } else {
            throw new Error("Empty color Palette");
          }
        } catch (e) {
          console.error("color extraction failed:", e);
          setDominantColor("#121212");
        }
      }, 100);
    };
    img.onerror = (err) => {
      console.error("image load error:", err);
      setDominantColor("#121212");
    };
    console.log("extracting from image:", imageUrl);
    img.src = imageUrl;
  };

  const toggleFavourtie = (song) => {
    addToFavourites(song);
    setFavourites(getFavourites());
  };

  const playSong = (song) => {
    console.log("Trying to play:", song.title);
    if (song.id === currentSong?.id) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      extractDominantColor(song.cover);
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
        dominantColor,
        isExpanded,
        setIsExpanded,
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
