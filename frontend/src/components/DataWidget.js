import React from "react";
import { Col, Row } from "react-bootstrap";

export default function DataWidget({ player }) {
  return (
    <div>
      {console.log(player)}
      <Col>
        <Row>
          <div className="data_field data_title">Name:</div>
          <div className="data_field data_box">{player.name}</div>
        </Row>
        <Row>
          <div className="data_field data_title">Position:</div>
          <div className="data_field data_box">{player.position}</div>
        </Row>
        <Row>
          <div className="data_field data_title">Ball Receipts:</div>
          <div className="data_field data_box">{player["Ball Receipt*"]}</div>
        </Row>
      </Col>
    </div>
  );
}
