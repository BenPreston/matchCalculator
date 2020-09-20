import React from "react";
import { Table } from "react-bootstrap";

export default function Teamsheet({ teamName, formation, lineups, onChange }) {
  console.log(onChange);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan="3">{teamName}</th>
        </tr>
        <tr colSpan="3">{formation}</tr>
      </thead>
      <tbody>
        {lineups.map((footballer) => {
          const playerName = footballer.player.name;
          return (
            <tr key={footballer.player.id} onClick={() => onChange(playerName)}>
              <td>{footballer.jersey_number}</td>
              <td>{footballer.position.name}</td>
              <td>{playerName}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
