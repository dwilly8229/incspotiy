import React, { useContext } from "react";
import { songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const TopT = ({ searchTerm }) => {
  const { playSong } = useContext(PlayerContext);
  const filterSongs = songsData
    .filter((item) => item.id > 3)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleClick = (song) => {
    playSong(song);
  };
  return (
    <div className="my-5 font-bold text-2xl flex flex-col gap-2">
      {filterSongs.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
          onClick={() => {
            handleClick(item);
          }}
        >
          <img
            src={item.cover}
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 truncate w-32 ">
              {item.artist}
            </p>
            <p className="text-white text-sm truncate w-32">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopT;
