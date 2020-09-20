import React, { Component, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Teamsheet from "./Teamsheet";
import DataWidget from "./DataWidget.js";

import "./matchData.css";
// Obviously I'm importing this data locally but this needs to be a dynamic API or saved in my Mongo really but that's next step
import { data } from "./data";

function MatchData() {
  // const [playerNameState, setplayerNameState] = useState("Select your player");
  const [playerNameState, setplayerNameState] = useState("Christiano Ronaldo");
  const [playerState, setPlayerState] = useState({ name: "Ben", shot: 4 });

  const playerEventTally = [];
  const starting11 = [];

  const lookUpPlayer = async (playerName) => {
    const newPlayer = await playerEventTally.find(
      (player) => player.name === playerName
    );
    setPlayerState(newPlayer);
  };

  const calcEventWithPlayer = (event) => {
    if (event.type.name === "Starting XI") {
      starting11.push(event);
    }

    if (event.player && event.player.name && event.type && event.type.name) {
      const player = event["player"]["name"];
      const type = event["type"]["name"];

      if (!playerEventTally.find((person) => person.name === player)) {
        playerEventTally.push({
          name: player,
          team: event["team"]["name"],
          position: event["position"]["name"],
        });
      }

      const footballer = playerEventTally.find((obj) => {
        return obj.name === player;
      });

      footballer[type] ? footballer[type]++ : (footballer[type] = 1);
    }
  };

  data.map((event) => calcEventWithPlayer(event));

  return (
    <div>
      <h1>Match data</h1>
      <h2>{playerNameState}</h2>
      {console.log(playerEventTally)}
      <Row className="justify-content-md-center">
        <Col>
          {" "}
          <Teamsheet
            teamName={starting11[0].team.name}
            formation={starting11[0].tactics.formation}
            lineups={starting11[0].tactics.lineup}
            onChange={(selectedPlayer) => lookUpPlayer(selectedPlayer)}
          />{" "}
          <Teamsheet
            teamName={starting11[1].team.name}
            formation={starting11[1].tactics.formation}
            lineups={starting11[1].tactics.lineup}
            onChange={(selectedPlayer) => setplayerNameState(selectedPlayer)}
          />
        </Col>
        <DataWidget player={playerState} />
      </Row>
    </div>
  );
}

export default MatchData;
