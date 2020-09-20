import React from "react";
import Navigation from "./components/Navigation";
import MatchData from "./components/MatchData";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import gameOne from "./data.json";

function App() {

  const games = [
    {
      'name': 'gameOne'
    },
    {
      'name': 'gameTwo'
    }
  ]

  return (
    <div className="App container">
      <Navigation />
      <MatchData games={games[0]}/>
    </div>
  );
}

export default App;
