import React, { useState } from "react";
import { Card, Button, Carousel, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import project1Image from "../assets/images/project1.JPG";
import project2Image from "../assets/images/project2.JPG";
import "./Projects.css";

const projects = [
  {
    title: "Advanced Budget Tracker",
    description: "An advanced dashboard for tracking income and expenditures.",
    image: project1Image,
    link: "https://budget-tracker-2-vert.vercel.app/",
    fullDescription: "This comprehensive dog rescue website serves as a platform for connecting rescued dogs with potential adopters. It features a user-friendly interface showcasing available dogs, their stories, and adoption procedures. The site also includes resources for dog care, a donation system, and a volunteer sign-up process.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    completionDate: "November 2024",
  },
  {
    title: "Dog Rescue Website",
    description: "A website dedicated to rescuing dogs and facilitating adoptions.",
    image: project2Image,
    link: "https://doggo-website-sooty.vercel.app/",
    fullDescription: "The Budget Tracker is a sophisticated financial management tool designed to help users monitor their income and expenses effectively. It offers features such as expense categorization, income tracking, budget setting, and visual representations of financial data through charts and graphs. The application also provides insights and suggestions for better financial management.",
    technologies: ["Vue.js", "Firebase", "Chart.js", "Vuex"],
    completionDate: "October 2024",
  },
];

const PortfolioCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setShowImageModal(true);
  };

  const handleDetailsClick = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  return (
    <div className="portfolio-carousel-container">
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
        {projects.map((project, index) => (
          <Carousel.Item key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="project-card">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="image-overlay">
                    <Button 
                      variant="light" 
                      onClick={() => handleImageClick(project)}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleDetailsClick(project)}
                    className="view-details-button"
                  >
                    <span className="d-none d-sm-inline">View Details</span>
                    <span className="d-inline d-sm-none">View</span>
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="carousel-indicators custom">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant={index === activeIndex ? "primary" : "outline-primary"}
            onClick={() => handleSelect(index)}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} className="img-fluid" />
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} className="img-fluid mb-3" />
          <h5>Description</h5>
          <p>{selectedProject?.fullDescription}</p>
          <h5>Technologies Used</h5>
          <ul>
            {selectedProject?.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
          <p><strong>Completed:</strong> {selectedProject?.completionDate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" href={selectedProject?.link} target="_blank" rel="noopener noreferrer">
            Visit Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PortfolioCarousel;

