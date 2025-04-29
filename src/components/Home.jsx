import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { songsData } from "../assets";

const Home = ({ searchTerm }) => {
  const { playSong, toggleFavourtie, isFav } = useContext(PlayerContext);

  const filterSongs = songsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleClick = (song) => {
    playSong(song);
  };

  const handleFav = (e, song) => {
    e.stopPropagation();
    toggleFavourtie(song);
  };
  return (
    <div className=" flex flex-col gap-2">
      {filterSongs.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-2 p-2 rounded cursor-pointer hover:bg-[#ffffff26]"
        >
          <div
            className="flex items-center gap-3"
            onClick={() => handleClick(item)}
          >
            <img
              src={item.cover}
              alt="avatar"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col leading-tight">
              <p className="text-xs text-gray-400 truncate w-32 ">
                {item.artist}
              </p>
              <p className="text-white text-sm truncate w-32">{item.title}</p>
            </div>
          </div>
          <button className="text-xs " onClick={(e) => handleFav(e, item)}>
            {isFav(item.id) ? "💖" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
