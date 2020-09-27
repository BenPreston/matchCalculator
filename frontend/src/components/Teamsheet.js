import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

export default function Teamsheet({ teamName, formation, lineups, onChange }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan="2">{teamName}</th>
        </tr>
        <tr colSpan="2">{formation}</tr>
      </thead>
      <tbody>
        {lineups.map((footballer) => {
          const playerName = footballer.player.name;
          const position = footballer.position.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
          return (
            <tr key={footballer.player.id} onClick={() => onChange(playerName)}>
              {/* <td>{footballer.jersey_number}</td> */}
              <td>{position}</td>
              <td>{playerName}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
