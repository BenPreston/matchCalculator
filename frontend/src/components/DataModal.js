import React, { Component, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DataModal(props) {
  const playerStatsList = Object.entries(props.player).map(([key, value]) => {
    return (
      <tr>
        <th className="data_field data_title">{key}: </th>
        <td className="data_field data_box">{value.toString()}</td>
      </tr>
    );
  });

  const {
    name,
    position,
    Block,
    Clearance,
    Dribble,
    Duel,
    Interception,
    Pass,
    Pressure,
  } = props.player;

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.player.name} - {props.player.team} - {props.player.position}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(props.player)}
          <h4>Player Match Report</h4>
          <h5>Overall Game</h5>
          <p></p>
          <h5>Attack</h5>
          <p>
            {name} player {position}. She had {Dribble} succesful dribbles and
            made {Pass} passes
          </p>
          <h5>Defence</h5>
          <p>
            She made {Block} blocks, {Clearance} clearances, won {Duel} duels,{" "}
            {Interception} interceptions and pressured the ball {Pressure}{" "}
            times.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DataModal;
