import React from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineArrowRight } from "react-icons/ai";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0" data-aos="zoom-in">
          <p style={{ textAlign: "justify"}}>
            Hello Everyone, My name is <span className="primary-header">Andreas Avgoustis</span> from Corfu, Greece. I am a computer science graduate and a passionate analyst and engineer.
            <br />
            <br />
            In addition to coding and analysis, here are some other things I enjoy doing!
          </p>
          <ul>
            <li className="about-activity">
              <AiOutlineArrowRight /> Reading Books
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Playing Games
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Watching Movies
            </li>
            <li className="about-activity">
              <AiOutlineArrowRight /> Travelling and Exploring the world
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
