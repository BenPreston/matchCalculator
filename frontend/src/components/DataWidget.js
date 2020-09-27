import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import "./dataWidget.css";

export default function DataWidget({ player }) {
  const playerStatsList = Object.entries(player).map(([key, value]) => {
    return (
      <tr>
        <th className="data_field data_title">{key}: </th>
        <td className="data_field data_box">{value.toString()}</td>
      </tr>
    );
  });

  return (
    <div>
      {console.log(player)}
      <Col>{playerStatsList}</Col>
    </div>
  );
}
