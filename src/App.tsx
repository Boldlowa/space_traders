import { useState } from "react";
import Home from "./Pages/Home/Home";
import "./App.css";
import { Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Systems from "./Pages/Systems/Systems";
import Fleet from "./Pages/Fleet/Fleet";
import Contracts from "./Pages/Contracts/Contracts";
import { AgentProvider, useAgent } from "./AgentContext";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: <HomeIcon /> },
  { key: "systems", label: "Systems", icon: <TravelExploreIcon /> },
  { key: "fleet", label: "Fleet", icon: <RocketLaunchIcon /> },
  { key: "contracts", label: "Contracts", icon: <AssignmentIcon /> },
];

function renderPage(page: string) {
  if (page === "home") return <Home />;
  if (page === "systems") return <Systems />;
  if (page === "fleet") return <Fleet />;
  if (page === "contracts") return <Contracts />;
  return (
    <div style={{ padding: 32, color: "#94a3b8" }}>
      <h2>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
      <p>Coming soon...</p>
    </div>
  );
}

function AppContent() {
  const [activePage, setActivePage] = useState("home");
  const { agent } = useAgent();

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1 className="brand-title">SpaceTraders Dashboard</h1>
        <h2 className="page-title">{NAV_ITEMS.find((item) => item.key === activePage)?.label}</h2>
        <h3 className="name">Boldlowa</h3>
        <span className="credits">Credits: {agent?.credits ?? 0}</span>
      </header>

      <div className="body-layout">
        <nav className="sidebar">
          {NAV_ITEMS.map(({ key, label, icon }) => (
            <Tooltip key={key} title={label} placement="right">
              <button
                type="button"
                className={`sidebar-btn${activePage === key ? " active" : ""}`}
                onClick={() => setActivePage(key)}
                aria-label={label}
              >
                {icon}
              </button>
            </Tooltip>
          ))}
        </nav>
        <div className="layout">
          <main className="page-content">{renderPage(activePage)}</main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AgentProvider>
      <AppContent />
    </AgentProvider>
  );
}

export default App;
