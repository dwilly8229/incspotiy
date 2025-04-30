import React, { useContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Favourities from "./Favourites";
import RecentlyPlayed from "./RecentlyPlayed";
import TopT from "./TopT";
import { PlayerContext } from "../context/PlayerContext";

const SongCard = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { dominantColor } = useContext(PlayerContext);

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/favourites":
        return "Favourites";
      case "/RecentlyPlayed":
        return "Recently Played";
      case "/TopTrack":
        return "Top Tracks";
      default:
        return "Home";
    }
  };
  return (
    <div
      className="h-full w-full lg:w-[75%] lg:m-2 lg:pt-6 pb-6 px-4 lg:ml-0 sm:px-6 pt-15 rounded  bg-[#121212] text-white transition-all duration-500 flex flex-col"
      style={{
        background: `linear-gradient(160deg, ${
          dominantColor || "#1e1e1e"
        }, #121212)`,
      }}
    >
      <div className="shrink-0">
        <h1 className="text-2xl font-bold pl-2 mb-4">{getTitle()}</h1>
        <input
          type="text"
          value={searchTerm}
          placeholder="  Search for artist or song  "
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full h-10 px-4 mb-4 rounded-full bg-neutral-800 text-white text-sm focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route
            path="/favourites"
            element={<Favourities searchTerm={searchTerm} />}
          />
          <Route
            path="/RecentlyPlayed"
            element={<RecentlyPlayed searchTerm={searchTerm} />}
          />
          <Route path="/TopTrack" element={<TopT searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default SongCard;
