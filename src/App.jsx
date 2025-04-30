import React, { useState } from "react";
import SideBar from "./components/SideBar";
import SongCard from "./components/SongCard";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-auto sm:min-h-screen bg-black relative overflow-hidden ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 text-white text-3xl lg:hidden"
      >
        &#9776;
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-90 z-30 lg:hidden"
          onClick={handleClose}
        ></div>
      )}

      <div className="h-screen flex flex-col lg:flex-row">
        <SideBar isOpen={isOpen} handleClose={handleClose} />
        <SongCard />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;
