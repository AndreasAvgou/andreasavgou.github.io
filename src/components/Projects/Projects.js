import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ProjectCard from "./ProjectCards";

import ProfitGraph from "../../Assets/Projects/profit-graph.jpg";
import Dev from "../../Assets/Projects/dev-survey-2023.png";
import Covid19 from "../../Assets/Projects/Covid-19.png";
import Performance from "../../Assets/Projects/Performance.png";
import SalesAnalysis from "../../Assets/Projects/SalesAnalysis.jpg";
import Melanoma from "../../Assets/Projects/Melanoma.png";
import Signal from "../../Assets/Projects/Signal Analysis and Processing.png";
import Healthcare from "../../Assets/Projects/Healthcare.png";



import "./project.css";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="Fluorescent-Blue">Works </strong>
        </h1>
        <p>Here are a few projects I've worked on recently.</p>
        <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Covid19}
              title="Covid-19 Data Analysis"
              description="In this project we analyzed the covid-19 in years 2020-02-20 - 2022-02-21 in case to deaths and vaccinations using Excel for data extraction and cleaning, SQL for querying necessary data, and Tableau for visualizing the results."
              ghLink="https://github.com/AndreasAvgou/Covid-19-Data-Analysis"
              demoLink="https://public.tableau.com/app/profile/andreas.avgoustis/viz/CovidProjectDashboard_16552268158640/Dashboard1"
            />
          </Col>

          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Dev}
              title="Stack Overflow Developer Survey 2023"
              description="My personal analysis in the Stack Overflow developer survey 2023 using Python for data analysis and knowledge extraction, and PowerBI for data visualization."
              ghLink="https://github.com/AndreasAvgou/Stack-Overflow-Developer-Survey-2023"
              demoLink="https://www.novypro.com/project/stack-overflow-developer-survey-2023"
            />
          </Col>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={ProfitGraph}
              title="Profit Sales 2016-2019"
              description="A completed an in-depth exploration of Profit Sales project from 2016-2019. Utilizing Tableau, I was able to create visually stunning representations of the data."
              ghLink = "#"
              demoLink="https://public.tableau.com/app/profile/andreas.avgoustis/viz/Train_16694120887110/Dashboard1"
            />
          </Col>

          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Performance}
              title="Employee Performance"
              description="A conducted in-depth exploration of Employee Performance project. By utilizing Power Bi and DAX, I was able to create visually stunning representations of the data. "
              ghLink="#"
              demoLink="https://www.novypro.com/project/emp"
            />
          </Col>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={SalesAnalysis}
              title="Sales Analysis"
              description="An in-depth exploration of sales analysis using Power Bi and DAX. The results are visually stunning and speak for themselves. "
              ghLink="#"
              demoLink="https://www.novypro.com/project/sales-30"
            />
          </Col>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Melanoma}
              title="Dermoscopic Melanoma Image Classification"
              description="This project objective was to create a new deep learning approach, based on convolutional neural networks, to classify dermoscopic images in one out of 32 categories "
              ghLink="#"
              demoLink="https://github.com/AndreasAvgou/Dermoscopic-Melanoma-Image-Classification"
            />
          </Col>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Signal}
              title="Signal Analysis and Processing"
              description="This project objective was to create a end to end Stochastic Project, based on signal analysis and processing, in order to minimize noise signal"
              ghLink="https://github.com/AndreasAvgou/Stochastic-Analysis-Process/tree/main/Full%20Project"
              demoLink="https://github.com/AndreasAvgou/Stochastic-Analysis-Process/blob/main/Full%20Project/FullProject.ipynb"
            />
          </Col>
          <Col md={2} lg={4} className="project-card">
            <ProjectCard
              imgPath={Healthcare}
              title="Optimization of healthcare process management using machine learning"
              description="This project was to delve into the multifaceted nature of healthcare management, highlighting the expertise required to optimize processes within dynamic healthcare environments."
              ghLink="https://github.com/AndreasAvgou/Optimization-of-healthcare-process-management-using-machine-learning"
              demoLink="https://github.com/AndreasAvgou/Optimization-of-healthcare-process-management-using-machine-learning/blob/main/Wait.ipynb"
            />
          </Col>

        </Row>
      </Container>
      <ScrollToTop />
    </Container>
  );
}

export default Projects;
