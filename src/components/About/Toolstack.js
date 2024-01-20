import React from "react";
import { Col, Row } from "react-bootstrap";
import {
 
  SiVisualstudiocode,

  SiWindows,

  SiGithub,
  SiMicrosoftazure,
  SiGooglecloud,
  SiGooglecolab,
  SiAtom,
  SiMicrosoft,
  SiMicrosoftoffice,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftoffice/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiWindows/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAtom/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftazure/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecloud/>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecolab/>
      </Col>
    </Row>
  );
}

export default Toolstack;
