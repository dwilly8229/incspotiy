import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets";
import { PlayerContext } from "../context/PlayerContext";

const SideBar = ({ isOpen, handleClose }) => {
  const { dominantColor } = useContext(PlayerContext);
  return (
    <div
      className={`fixed lg:relative top-0 left-0 w-[250px] lg:w-[25%] sm:w-[383px]  h-full lg:p-2 flex flex-col gap-2 text-white z-[999] transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:flex `}
    >
      <div
        className="bg-[#121212] h-[100%] rounded flex flex-col md:shrink-0 justify-between transition-all duration-500"
        onClick={handleClose}
        style={{
          background: `linear-gradient(160deg, ${
            dominantColor || "#1e1e1e"
          }, #121212)`,
        }}
      >
        <div className=" flex items-center mb-8">
          <div>
            <img
              src={assets.spotify_logo}
              alt="Spotify Logo"
              className="w-14 h-auto"
              onClick={handleClose}
            />
          </div>
          <span className="ml-2 text-2xl font-bold tracking-wide ">
            Spotify
          </span>
        </div>
        <ul className="flex-grow">
          <li className="pl-5 mb-4">
            <NavLink
              to="/"
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClose}
            >
              <img className="w-6" src={assets.home_icon} alt="" />
              <p className="font-bold">For You</p>
            </NavLink>
          </li>

          <li className="pl-5 mb-4">
            <NavLink
              to="/TopTrack"
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClose}
            >
              <img className="w-6" src={assets.stack_icon} alt="" />
              <p className="font-bold">Top Tracks</p>
            </NavLink>
          </li>
          <li className="pl-5 mb-4">
            <NavLink
              to="/favourites"
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClose}
            >
              <img className="w-6" src={assets.star_1_icon} alt="" />
              <p className="font-bold">Favourites</p>
            </NavLink>
          </li>
          <li className="pl-5 mb-4">
            <NavLink
              to="/RecentlyPlayed"
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClose}
            >
              <img className="w-6" src={assets.recent_icon} alt="" />
              <p className="font-bold">Recently Played</p>
            </NavLink>
          </li>
        </ul>
        <div className="mt-auto flex items-center space-x-3 pl-5">
          <img
            src={assets.profile_icon}
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
