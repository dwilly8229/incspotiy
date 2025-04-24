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
      className="w-[25%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 transition-all duration-500"
      style={{
        background: `linear-gradient(160deg, ${
          dominantColor || "#1e1e1e"
        }, #121212)`,
      }}
    >
      <h1 className="text-2xl font-bold mb-4">{getTitle()}</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for artist or song"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-neutral-800 text-white text-sm focus:outline-none"
      />
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
  );
};

export default SongCard;
