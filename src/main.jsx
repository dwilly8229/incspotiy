import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>
);
