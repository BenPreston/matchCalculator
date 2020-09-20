import React from "react";
import { Table } from "react-bootstrap";

export default function Teamsheet({ teamName, formation, lineups }) {
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
          return (
            <tr key={footballer.player.id}>
              <td>{footballer.jersey_number}</td>
              <td>{footballer.position.name}</td>
              <td>{footballer.player.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
