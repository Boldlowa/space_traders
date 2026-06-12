import { useState } from "react";
import Home from "./Pages/Home/Home";
import "./App.css";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Box>
          <IconButton
            onClick={() => {
              console.log("Menu clicked");
              setIsDrawerOpen(true);
            }}
            aria-label="Ouvrir le menu"
          >
            <MenuIcon style={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
        <h1 className="brand-title">SpaceTraders Dashboard</h1>
      </header>

      <div className="layout">
        <aside className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <div className="drawer-head">
            <h2>Navigation</h2>
            <button
              type="button"
              className="close-drawer"
              onClick={closeDrawer}
            >
              Fermer
            </button>
          </div>
          <nav>
            <button
              type="button"
              className="drawer-link active"
              onClick={closeDrawer}
            >
              Home
            </button>
          </nav>
        </aside>

        {isDrawerOpen ? (
          <button
            type="button"
            className="drawer-backdrop"
            aria-label="Fermer le menu"
            onClick={closeDrawer}
          />
        ) : null}

        <main className="page-content">
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;
