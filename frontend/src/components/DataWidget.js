import React from "react";
import { Col, Row } from "react-bootstrap";
import "./dataWidget.css";

export default function DataWidget({ player }) {
  const playerStatsList = Object.entries(player).map(([key, value]) => {
    return (
      <Row>
        <div className="data_field data_title">{key}: </div>
        <div className="data_field data_box">{value.toString()}</div>
      </Row>
    );
  });

  return (
    <div>
      {console.log(player)}
      <Col>{playerStatsList}</Col>
    </div>
  );
}
