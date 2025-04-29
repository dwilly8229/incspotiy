import React, { useContext } from "react";

import { PlayerContext } from "../context/PlayerContext";

const RecentlyPlayed = ({ searchTerm }) => {
  const { playSong, isFav, toggleFavourtie, recentlyPlayed } =
    useContext(PlayerContext);
  const filtered = recentlyPlayed.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleClick = (song) => {
    playSong(song);
  };

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between gap-2 p-2 rounded hover:bg-[#ffffff26] cursor-pointer"
        >
          <div
            className="flex items-center gap-3"
            onClick={() => handleClick(song)}
          >
            <img
              src={song.cover}
              alt="cover"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-xs text-gray-400">{song.artist}</p>
              <p className="text-sm text-white">{song.title}</p>
            </div>
          </div>
          <button
            className="text-white text-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourtie(song);
            }}
          >
            {isFav(song.id) ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentlyPlayed;
