import React, { Component } from "react";
import Teamsheet from "./Teamsheet";
import { Row, Col } from "react-bootstrap";

// Obviously I'm importing this data locally but this needs to be a dynamic API or saved in my Mongo really but that's next step
import { data } from "./data";

export default class MatchData extends Component {
  render() {
    const playerEventTally = [];
    const starting11 = [];

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

        {/* {console.log(starting11[0], playerEventTally)} */}
        {console.log(starting11[0].tactics.lineup)}

        <Row className="justify-content-md-center">
          <Col>
            {" "}
            <Teamsheet
              teamName={starting11[0].team.name}
              formation={starting11[0].tactics.formation}
              lineups={starting11[0].tactics.lineup}
            />
          </Col>
          <Col>
            {" "}
            <Teamsheet
              teamName={starting11[1].team.name}
              formation={starting11[1].tactics.formation}
              lineups={starting11[1].tactics.lineup}
            />
          </Col>
          <Col>data to go here</Col>
        </Row>
      </div>
    );
  }
}
