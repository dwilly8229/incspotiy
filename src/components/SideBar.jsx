import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets";
import { PlayerContext } from "../context/PlayerContext";

const SideBar = () => {
  const { dominantColor } = useContext(PlayerContext);
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div
        className="bg-[#121212] h-full rounded flex flex-col justify-around transition-all duration-500"
        style={{
          background: `linear-gradient(160deg, ${
            dominantColor || "#1e1e1e"
          }, #121212)`,
        }}
      >
        <div className="flex items-center mb-8">
          <img
            src={assets.spotify_logo}
            alt="Spotify Logo"
            className="w-16 h-auto"
          />
          <span className="ml-2 text-2xl font-bold">Spotify</span>
        </div>
        <ul className="flex-grow">
          <li className="pl-5 mb-4">
            <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
              <img className="w-6" src={assets.home_icon} alt="" />
              <p className="font-bold">For You</p>
            </NavLink>
          </li>

          <li className="pl-5 mb-4">
            <NavLink
              to="/TopTrack"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img className="w-6" src={assets.stack_icon} alt="" />
              <p className="font-bold">Top Tracks</p>
            </NavLink>
          </li>
          <li className="pl-5 mb-4">
            <NavLink
              to="/favourites"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img className="w-6" src={assets.star_icon} alt="" />
              <p className="font-bold">Favourites</p>
            </NavLink>
          </li>
          <li className="pl-5 mb-4">
            <NavLink
              to="/RecentlyPlayed"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img className="w-6" src={assets.recent_icon} alt="" />
              <p className="font-bold">Recently Played</p>
            </NavLink>
          </li>
        </ul>
        <div className="mt-auto flex items-center space-x-3">
          <img
            src={assets.profile_icon}
            alt="avatar"
            className="rounded-full w-10 h-10" // Set smaller width and height
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
