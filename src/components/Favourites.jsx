import React, { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { getFavourites } from "../utils/storage";

const Favourites = ({ searchTerm }) => {
  const [favourites, setFavourites] = useState([]);
  const { playSong, toggleFavourtie, isFav } = useContext(PlayerContext);
  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  const toggleFavourties = (song) => {
    toggleFavourtie(song);
    setFavourites(getFavourites());
  };

  const handlePlay = (song) => {
    playSong(song);
  };

  const filtered = favourites.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between gap-2 p-2 rounded hover:bg-[#ffffff26] cursor-pointer"
        >
          <div
            className="flex items-center gap-3 "
            onClick={() => handlePlay(song)}
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
            className="text-white text-xs"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourties(song);
            }}
          >
            {isFav(song.id) ? "💔" : "❤️"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favourites;
