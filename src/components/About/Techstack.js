import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiPython,
  DiPostgresql,
  DiGit,
  DiMsqlServer,
  DiSpark,
} from "react-icons/di";
import {
  SiPowerbi,
  SiMysql,
  SiMicrosoftexcel,
  SiTensorflow,
  SiTableau,
  SiKeras,
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftexcel/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPowerbi/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTableau/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMsqlServer/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKeras/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiSpark/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGit/>
      </Col>
      
      
      
    </Row>
  );
}

export default Techstack;
