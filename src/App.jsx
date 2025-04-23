import React from "react";
import SideBar from "./components/SideBar";
import SongCard from "./components/SongCard";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  return (
    <div className="h-screen bg-black">
      <div className="h-full flex">
        <SideBar />
        <SongCard />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;
